import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';



class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  dynamic resp_blk = "";
  dynamic resp_blk2 = "";

  final textEditingController = <TextEditingController> [
    TextEditingController(),
    TextEditingController(),
    TextEditingController(),
    TextEditingController(),
    TextEditingController(),
    TextEditingController(), // 제목 5
    TextEditingController(), // 설명 6
  ];

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    textEditingController[0].dispose();
    textEditingController[1].dispose();
    textEditingController[2].dispose();
    textEditingController[3].dispose();
    textEditingController[4].dispose();
    textEditingController[5].dispose();
    textEditingController[6].dispose();

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('영어문제 생성기'),),
      drawer: Drawer(),
      body: Column(
        children: <Widget>[
          Text('빈칸 문제 생성기'),
          RaisedButton(
            key: UniqueKey(),
            child: Text("작성하시고 버튼을 누르세요."),
            onPressed: () async {
              setState(() {
                resp_blk = null;
              });

              final response = await http.post(
                'https://us-central1-epg-kr.cloudfunctions.net/blk',
                body: jsonEncode(
                  {
                    'title': 'foo',
                    'body': 'bar',
                    'userId': 1,
                    'text': textEditingController[0].text,
                    'type': 'blk',
                  },
                ),
                headers: {'Content-Type': "application/json"},
              );

              setState(() {
                resp_blk = '로딩중';
                resp_blk = response.body;
                print('result : '+response.body);
              });
            },
          ),
          Container(
            child: TextField(
              minLines: 10,
              maxLines: 100,
              key: UniqueKey(),
              decoration: InputDecoration(hintText: '빈칸 본문을 입력하세요.'),
              controller: textEditingController[0],
            ),
          ),
          Container(
            child: resp_blk == null ? Center(child: CircularProgressIndicator()) : Text(resp_blk),
          ),

          Text('빈칸 문제 생성기2'),
          RaisedButton(
            key: UniqueKey(),
            child: Text("작성하시고 버튼을 누르세요."),
            onPressed: () async {
              var dio = Dio();
              setState(() {
                resp_blk2 = null;
              });
              Response res = await dio.post('https://us-central1-epg-kr.cloudfunctions.net/blk',
                data:
                  {
                    'title': 'foo',
                    'body': 'bar',
                    'userId': 1,
                    'text': textEditingController[1].text,
                    'type': 'blk',
                  },

                onSendProgress: (int sent, int total) {
                  print("$sent $total");
                },
              );

              setState(() {
                print('Okay');
                resp_blk2 = '로딩중';
                resp_blk2 = res.data.toString();
                print('result : '+res.data.toString());
              });
            },
          ),
          Container(
            child: TextField(
              minLines: 10,
              maxLines: 100,
              key: UniqueKey(),
              decoration: InputDecoration(hintText: '빈칸 본문을 입력하세요.'),
              controller: textEditingController[1],
            ),
          ),
          Container(
            //child: resp_blk2 == null ? Center(child: CircularProgressIndicator()) : Text(resp_blk2),
          ),
        ],
      )
    );
  }
}

