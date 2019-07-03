# ライブハウスマップを作成する(Create Live House Map)
* [ミーティングルーム(Meeting room)](https://gitter.im/LiveHouseMap/community#)
* [サンプルページ(Sample page is here)](https://zenryokuservice.com/sample/js/SampleMap.html)

### 使用する技術
* [Ajax(非同期通信)](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
* [SQL(MySql)](https://www.mysql.com/jp/)
* スライド方法
1. [CSSを使用する方法](http://bashalog.c-brains.jp/14/12/22-133149.php)

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
5. <del>Add data to DB -> KML output-> Display overlay with loading KML</del><br/>
load JSON, view overlays on google map.
6. Multilingualizationed site

### DB
Using Mysql, 
1. Area master table(AREA_MST) Created
2. over lay info table(OVERLAY_INFO)
3. User table【WordPress】

### How to implement
#### Plan to implementation as follow
* PHP: Create overlay info and manage user.
* Google Maps API: Create map.
* HTML5: Visualization.

#### Screen image
see lower.

#### Design
1. Select data from DB<del>Read KML file</del> at initial display, create overlay and display
2. Operate with the action button at the bottom of the screen <BR/>
* The area of this action button can slide sideways
3. An overlay button can be prepared on the action button to add an overlay on the screen <br/>
* Output KML file when adding a button.

-----------------------------------------------
## 仕様
1. DBに登録したデータを<del>KMLファイルJSONファイル</del>を読み込み、マップにオーバーレイを表示する
2. 画面をタップしてオーバーレイを作成、追加する
3. ログインユーザーのみオーバーレイを作成できる
4. 現状は、ログインユーザー出なくとも画面にオーバーレイを作成できる
5. JSONファイルの出力<br/>
<del>データの登録 -> KMLファイル出力 -> KMLロードして画面に表示</del>
6. 多言語化対応を行う (Japanese and English)

### DB
Mysqlに作成するテーブル
1. エリアマスタ (AREA_MST) 作成済み
2. 地域情報 (AREA_INFO)
3. ユーザー管理 【WordPress】

### 実装方法
#### 実装計画
* PHP: 地域情報の管理、情報を追加するユーザーの管理
* Google Maps API: 地図の作成
* HTML5: 可視化

#### 画面のイメージ
![サンプルイメージ](https://github.com/ZenryokuService/LiveHouseMap/blob/master/sketch.svg)

#### 設計
1. 初期表示時に、DBからデータ<del>KMLファイル</del>を読み込みオーバーレイを作成し表示する
2. 画面の下部にあるアクションボタンで操作する<BR/>
* このアクションボタンの領域はスライドして横にずらすことができる
3. アクションボタンに地域情報追加ボタンを用意して画面上にオーバーレイを追加することができる<br/>
* 地域情報を追加した時にDBを更新する<br>
<del>ボタンを追加したときにKMLファイルを出力する。</del>


### === 参考リンク ===
* [KMLチュートリアル](https://developers.google.com/kml/documentation/kml_tut?hl=ja)
* [Gooogle Maps APIチュートリアル](https://developers.google.com/maps/documentation/javascript/tutorial?hl=ja)
* [Google Map初期設定](https://zenryokuservice.com/wp/category/website/googleapis/)
* [非同期通信の実装](https://ja.wikipedia.org/wiki/XMLHttpRequest)

### サーバー情報(Server Info)
|使用可能プログラム|バージョン|
|:-------------|-------:|
|PHP	|5.6.30 (モジュール版)|
|mysql|	5.5.36|
|zip(command)||
|unzip(command)||
|gcc|	4.1.2|
|cgi||
* メールサーバーあり(Mail server)
