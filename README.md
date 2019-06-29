# LiveHouseMapを作成する

[![Join the chat at https://gitter.im/LiveHouseMap/community](https://badges.gitter.im/LiveHouseMap/community.svg)](https://gitter.im/LiveHouseMap/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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

## 仕様
1. DBに登録してあるデータをオーバレイとして表示する
2. タップすることで、画面上からデータの追加ができる
3. ログインユーザーのみ画面からライブハウス情報を追加できる
4. サンプル作成状態(２０19-06-29〜)ではログイン処理なし
5. データの読み込み->KML出力->KMLのロードでオーバーレイを表示する

### === 参考リンク ===
* [KMLチュートリアル](https://developers.google.com/kml/documentation/kml_tut?hl=ja)
* [Gooogle Maps APIチュートリアル](https://developers.google.com/maps/documentation/javascript/tutorial?hl=ja)
* [自前の記事](https://zenryokuservice.com/wp/category/website/googleapis/)
