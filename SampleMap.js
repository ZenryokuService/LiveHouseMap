/**************************************************
 *          ライブハウス照会機能実装スクリプト          *
 **************************************************/
/** 登録時に選択する位置情報のマーカー */
 var selectedMarker;

/** 画面の初期化 */
function loadView() {
    document.getElementById('sideWin').hidden = true;
    // 画像のプレビュー
    imgDiv = document.getElementById('imageFile');
    imgDiv.onchange = function (evt) {
        var reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById('prevew').src = event.target.result;
        };
        reader.readAsDataURL(this.files[0]);
    };

    // Load Overlay
    var areaData = getSampleData();
    console.log(areaData);

}

/** 画面の開閉 */
function sideWinHandle(sideWin) {
   sideWin.hidden = !sideWin.hidden;
}

/** サンプルデータ(オーバーレイ)の取得 */
function getSampleData() {
    var dataArray = [];
    dataArray.push(createMapData('Zepp Sapporo'
                    ,'〒064-0809 北海道札幌市中央区南９条西４丁目４'
                    ,'https://www.zepp.co.jp/hall/sapporo/'
                    ,43.049468
                    ,141.353902));

    dataArray.push(createMapData('STUDIO810'
                    ,'〒064-0808 北海道札幌市中央区南８条西４丁目４２２'
                    ,'http://www.f-a-l.co.jp/810/'
                    ,43.049805
                    ,141.353793));

    dataArray.push(createMapData('LIVE HOUSE SPIRITUAL LOUNGE'
                    ,'〒060-0062 札幌市中央区南2西4丁目10番地　Large Countory bld. BF'
                    ,'http://www.spirituallounge.jp/'
                    ,43.057624
                    ,141.352180));

    return dataArray;
}

/** サンプルデータ(JSON)作成 */
function createMapData(name, address, url, lat, lng) {
    json = {
        name: name,
        address: address,
        url: url,
        lat: lat,
        lng: lng
    };
    return json;
}

/** 位置情報の取得と選択位置表示(Overlay) */
function viewLatLng(mapEvent, map) {
    if (selectedMarker != undefined || selectedMarker != null) {
        selectedMarker.setMap(null);
    }
    document.getElementById('latValue').textContent = mapEvent.latLng.lat();
    document.getElementById('lngValue').textContent = mapEvent.latLng.lng();
    selectedMarker = new google.maps.Marker(selectedOverlayOpt(mapEvent));
    selectedMarker.setMap(map);
}

/** 選択用のオーバーレイOption */
function selectedOverlayOpt(mapEvent) {
    return {
        position: mapEvent.latLng,
        animation: google.maps.Animation.DROP,
        icon: {
            url: "mapImg/selected.png",
            scaledSize: new google.maps.Size(40, 40)
        },
    };
}

/** セットしたデータをPHPに送信する */
function postData() {

}

/** Ajax送信処理 */
function ajaxPost() {
    
}
