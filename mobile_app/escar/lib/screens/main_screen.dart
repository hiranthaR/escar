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
  Widget detailsWidget = Expanded(
    child: Center(
      child: Text("Scan for the details"),
    ),
  );
  Map detailsKeys = {
    "barcode": "Barcode :",
    "brand": "Brand :",
    "price": "Price ",
    "expiryDate": "Expire date :",
    "manufactureDate": "Manufacture date :",
    "materials": "Materials :",
    "howToUse": "How to use :",
    "company": "Company :",
    "nutritionalValues": "Nutritional Values :",
    "whatAreTheUses": "What are the uses :",
    "aboutTheHealthy": "About the Healthy",
    "healthAndSafetyInstructions": "Health and Safety Instructions",
    "telephoneNumbers": "Telephone Numbers :",
    "howToStore": "How to Store :",
    "productNumberAndBatchNumber": "Product Number & Batch Number :",
    "categoryOfProductType": "Category of Product type :"
  };

  renderWidget(QuerySnapshot qs) {
    if (qs.documents.length == 0) return Text('No item found for the barcode');

    List<Widget> rowWidgets = detailsKeys.keys
        .map(
          (k) => qs.documents[0].data[k] != null
              ? Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Expanded(child: Text(detailsKeys[k])),
                    Expanded(
                      child: k != 'materials'
                          ? Text(qs.documents[0].data[k])
                          : Wrap(
                              children: qs.documents[0].data[k]
                                  .map<Widget>(
                                    (item) => Padding(
                                      padding: EdgeInsets.fromLTRB(3, 0, 3, 0),
                                      child: Chip(
                                        label: Text(item),
                                      ),
                                    ),
                                  )
                                  .toList(),
                            ),
                    ),
                  ],
                )
              : SizedBox.shrink(),
        )
        .toList();
    return Container(
      padding: EdgeInsets.all(10),
      child: Column(
        children: <Widget>[
          Text(
            qs.documents[0].data['itemName'] ?? "No Name",
            style: TextStyle(fontSize: 20),
          ),
          Container(
            height: 20,
            width: double.infinity,
          ),
          Column(
            children: rowWidgets,
          ),
        ],
      ),
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
                onPressed: () => onBarcode("testing123", context),
              ),
            ),
            detailsWidget
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.search),
        onPressed: () => onScan(context),
        backgroundColor: Theme.of(context).primaryIconTheme.color,
      ),
    );
  }
}
