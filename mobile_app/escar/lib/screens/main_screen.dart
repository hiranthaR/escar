import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  var barcode = '';
  var details = '';

  onScan() async {
    try {
      String barcode =
          await FlutterBarcodeScanner.scanBarcode('#34eb7d', 'cancel', true);
      setState(() {
        this.barcode = barcode;
      });
      // QuerySnapshot qs = await Firestore.instance
      //     .collection('items')
      //     .where('barcode', isEqualTo: barcode)
      //     .limit(1)
      //     .getDocuments();
      // setState(() {
      //   details = qs.documents[0].data.toString();
      // });
    } on PlatformException catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Container(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            RaisedButton(
              child: Text("click"),
              onPressed: () => onScan(),
            ),
            Text(barcode),
            Text(details),
          ],
        ),
      ),
    );
  }
}
