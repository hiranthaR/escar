import 'package:escar/screens/main_screen.dart';
import 'package:flutter/material.dart';

void main() => runApp(EscarApp());

class EscarApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'escar',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        brightness: Brightness.dark,
      ),
      home: MainScreen(),
    );
  }
}
