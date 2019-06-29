# ライブハウスマップを作成する(Create Live House Map)
* [ミーティングルーム(Meeting room)](https://gitter.im/LiveHouseMap/community#)
* [サンプルページ(Sample page is here)](https://zenryokuservice.com/sample/js/SampleMap.html)

## 実現する内容
【English】
1. Create Live House Map where club with live music is and more infomations in Sapporo<br/>

【日本語】
1. 札幌周辺のライブハウス、イベントスペースの情報をGoogleMapに表示する。


## specification
1. You can add data from the screen by tapping
2. You can add data from the screen by tapping
3. Only login users can add live house information from the screen
4. There is no login processing in the sample creation status (2019-06-29-)
5. Load data-> KML output-> Display overlay with KML load
6. Multilingualizationed site

### DB
Using Mysql, 
1. Area master table(AREA_MST)
2. over lay info table(OVERLAY_INFO)
3. User table【WordPress】

### How to implement
#### Plan to implementation as follow
* PHP: Create overlay info and manage user.
* Google Maps API: Create map.
* HTML5: Visualization.

## 仕様
1. DBに登録してあるデータをオーバレイとして表示する
2. タップすることで、画面上からデータの追加ができる
3. ログインユーザーのみ画面からライブハウス情報を追加できる
4. サンプル作成状態(2019-06-29〜)ではログイン処理なし
5. データの読み込み->KML出力->KMLのロードでオーバーレイを表示する
6. 国際化対応を行う(Japanese and English)

### DB
Mysqlにて、以下のテーブルを作成する
1. エリアマスタ(AREA_MST)
2. 地域情報(OVERLAY_INFO)
3. ユーザー管理【WordPress】

### 実装方法
#### 実装計画
* PHP: 地域情報の管理、情報を追加するユーザーの管理
* Google Maps API: 地図の作成
* HTML5: 可視化

#### 画面のイメージ
![サンプルイメージ](https://github.com/ZenryokuService/LiveHouseMap/blob/master/sketch.svg)
1. 初期表示時に、KMLファイルを読み込みオーバーレイを作成し表示する
2. 画面の下部にあるアクションボタンで操作する<BR/>
* このアクションボタンの領域はスライドして横にずらすことができる
3. アクションボタンに地域情報追加ボタンを用意して画面上にオーバーレイを追加することができる<br/>
* ボタンを追加したときにKMLファイルを出力する。


### === 参考リンク ===
* [KMLチュートリアル](https://developers.google.com/kml/documentation/kml_tut?hl=ja)
* [Gooogle Maps APIチュートリアル](https://developers.google.com/maps/documentation/javascript/tutorial?hl=ja)
* [自前の記事](https://zenryokuservice.com/wp/category/website/googleapis/)

### サーバー情報(Server Info)
|使用可能プログラム|バージョン|
|:-------------|-------:|
|PHP	|5.6.30 (モジュール版)|
|mysql|	5.5.36|
|zip(command)||
|unzip(command)||
|gcc|	4.1.2|
|cgi|
* メールサーバーあり(Mail server)
