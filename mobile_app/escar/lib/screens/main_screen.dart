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
  Widget detailsWidget = Container();

  renderWidget(QuerySnapshot qs) {
    if (qs.documents.length == 0) return Text('No item found for the barcode');
    return Column(
      children: <Widget>[
        Text(
          qs.documents[0].data['itemName'] ?? "No Name",
          style: TextStyle(fontSize: 20),
        )
      ],
    );
  }

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
    QuerySnapshot qs = await Firestore.instance
        .collection('items')
        .where('barcode', isEqualTo: barcode)
        .limit(1)
        .getDocuments();
    setState(() {
      detailsWidget = renderWidget(qs);
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
                child: Text("Set manually"),
                // onPressed: () => onBarcode("725272730706",context),
                onPressed: () => onBarcode("testding123", context),
              ),
            ),
            detailsWidget
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.photo_camera),
        onPressed: () => onScan(context),
        backgroundColor: Theme.of(context).primaryIconTheme.color,
      ),
    );
  }
}
