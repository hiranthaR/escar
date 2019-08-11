import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  var barcode = '';
  Map details = {};
  List<Widget> array = [];

  onBarcode(barcode, context) async {
    showDialog(
      builder: (context) => Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          CircularProgressIndicator(),
        ],
      ),
      context: context,
      barrierDismissible: false,
    );
    array.clear();
    QuerySnapshot qs = await Firestore.instance
        .collection('items')
        .where('barcode', isEqualTo: barcode)
        .limit(1)
        .getDocuments();
    setState(() {
      this.details = qs.documents.length != 0 ? qs.documents[0].data : [];
      details.forEach(
        (k, v) => array.add(
          Row(
            // mainAxisAlignment: MainAxisAlignment,
            children: <Widget>[
              Expanded(child: Text(k)),
              Expanded(child: Text(v.toString())),
            ],
          ),
        ),
      );
    });
    Navigator.pop(context);
  }

  onScan(context) async {
    try {
      String barcode =
          await FlutterBarcodeScanner.scanBarcode('#34eb7d', 'close', true);
      setState(() {
        this.barcode = barcode;
      });
      onBarcode(barcode, context);
    } on PlatformException catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Escar'),
      ),
      body: Container(
        child: Column(
          children: <Widget>[
            Center(
              child: RaisedButton(
                child: Text("Scan Barcode"),
                onPressed: () => onScan(context),
              ),
            ),
            Center(
              child: RaisedButton(
                child: Text("Set manually"),
                // onPressed: () => onBarcode("725272730706"),
                onPressed: () => onBarcode("testing123", context),
              ),
            ),
            Text(barcode),
            Column(
              children: array,
            ),
          ],
        ),
      ),
    );
  }
}
