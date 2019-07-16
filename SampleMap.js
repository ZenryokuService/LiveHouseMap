/**************************************************
 *          GeoLocationAPIスクリプト          *
 **************************************************/
// グローバル変数
var id, target;

function getCurrentPos() {
    if (navigator.geolocation == false) {
        console.log("GEO Locaion is unable.");
        return;
    }
    // オプション・オブジェクト
    var optionObj = {
    	"enableHighAccuracy": false ,
    	"timeout": 5000 ,
    	"maximumAge": 0 ,
    };
    target = {
        latitude: 0,
        longitufe: 0
    };
    // Navigator.geolocation
    id = navigator.geolocation.watchPosition(
        successCurrentPos // 成功時のコールバック
        , errorCurrentPos // 失敗時のコールバック
        , optionObj); // オプション設定

}

/** GeoLocationの成功時のコールバック */
function successCurrentPos(position) {
    var crd  = position.coords;
    // マップの位置情報オブジェクト
    var mapLatLng = new google.maps.LatLng(crd.latitude, crd.longitude);

    if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
      console.log('Congratulations, you reached the target');
      navigator.geolocation.clearWatch(id);
    }
    // マーカーの追加
    var current = new google.maps.Marker({
        map: map,
        position: mapLatLng,
        icon: './mapImg/you.png'
    });
    console.log("test");
}
/** GeoLocationのエラー時のコールバック */
function errorCurrentPos(error) {
    // エラーコード(error.code)の番号
    // 0:UNKNOWN_ERROR				原因不明のエラー
    // 1:PERMISSION_DENIED			利用者が位置情報の取得を許可しなかった
    // 2:POSITION_UNAVAILABLE		電波状況などで位置情報が取得できなかった
    // 3:TIMEOUT					位置情報の取得に時間がかかり過ぎた…

    // エラー番号に対応したメッセージ
    var errorInfo = [
        "原因不明のエラーが発生しました…。" ,
        "位置情報の取得が許可されませんでした…。" ,
        "電波状況などで位置情報が取得できませんでした…。" ,
        "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
    ];

    alert(errorInfo[error.code]);
    id  = null;
}
/**************************************************
 *          ライブハウス照会機能実装スクリプト          *
 **************************************************/
/** 登録時に選択する位置情報のマーカー */
 var selectedMarker;
/** 入力フォーム */
var sideWin;
/** XMLHttpRequest */
var xhr;

/** 画面の初期化 */
function loadView() {
    // GeoLocation API
    getCurrentPos();
    // XMLHttpRequestの生成
    xhr = createXmlHttpRequest();

    sideWin = document.getElementById('sideWin');
    sideWin.hidden = true;
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
    var areaData = dstMapData();
}

/** 画面の開閉 */
function sideWinHandle() {
    console.log("change");
    if (sideWin.style.display === 'block') {
        sideWin.style.display = "none";
    } else {
        sideWin.style.display = "block";
    }
    sideWin.hidden = !sideWin.hidden;
}

/**
1. PHPでマップデータ(オーバーレイ)の取得
2. 取得したデータをHTMLのDIVタグに出力する
 */
function dstMapData() {
 // 初期表示用データの取得
 xhr.open('GET', 'https://zenryokuservice.com/tools/maps/GetMapInfo.php', true);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;  charset=UTF-8"');
 xhr.onreadystatechange = dstMap;
 try {
     xhr.send();
 } catch(e) {
    console.log(e);
 }
}

/** 初期データ取得処理のコールバック関数 */
function dstMap(response) {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            alert(xhr.responseText);
        } else {
            alert('リクエストに問題が発生しました');
        }
    }
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
    // 表示部分に設定
    document.getElementById('latText').textContent = mapEvent.latLng.lat();
    document.getElementById('lngText').textContent = mapEvent.latLng.lng();
    // 送信部分に設定
    document.getElementById('latValue').value = mapEvent.latLng.lat();
    document.getElementById('lngValue').value = mapEvent.latLng.lng();

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
    ajaxPost();
}

/** XMLHttpRequest作成 */
function createXmlHttpRequest() {
    console.log("init httpRequest");
    xhr = new XMLHttpRequest();
    return xhr;
}

/** レスポンスを取得するときの実装 */
function recieveResponse() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            alert(xhr.responseText);
        } else {
            alert('リクエストに問題が発生しました');
        }
    }
}
/** Ajax送信処理 */
function ajaxPost() {
    xhr.open('POST', 'https://zenryokuservice.com/tools/maps/InsertMapInfo.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;  charset=UTF-8"');
    xhr.onreadystatechange = recieveResponse;
    // POSTデータを設定する
    var data = createJSON();
    try {
        xhr.send(data);
    } catch(e) {
        console.log(e);
    }
}

// application/x-www-form-urlencoded
// application/json
/** Ajax送信 */
function ajaxGet() {
    console.log(xhr);
    xhr.open('GET', 'https://zenryokuservice.com/tools/maps/InsertMapInfo.php?param=test', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = recieveResponse;

    xhr.send();
}

/** POST送信するデータ(JSON)を作成する */
function createJSON() {
    var form = document.getElementById("mapData");
    var data = new FormData();
    data.appen("name", form.name.value);
    data.appen("url", form.url.value);
    data.appen("aFile", form.imageFile.files[0]);
    data.append("lat", form.lat.value);
    data.append("lng", form.lng.value);
    return data;
}
