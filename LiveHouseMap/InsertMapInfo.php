<?php
require_once('Const.php');
/** エンコード */
header("Content-Type: text/html; charset=UTF-8");
ini_set('display_errors', "On");
/** 日付の設定 */
date_default_timezone_set('Asia/Tokyo');

//JSからのデータを受け取る
//$inData = file_get_contents('php://input');
//$dec = json_decode($inData);

// DBアクセス
$dns = 'mysql:host=localhost;dbname=db_takunoji_2';
$username = DB_USER;
$password = DB_PASS;
$driver_options = [
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_EMULATE_PREPARES => false,
];

// 入力データを受け取る
$id=1;
$name = $_POST['name'];
$url  = $_POST['url'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];
$ownerId = 1;
$imgTmp = $_FILES['aFile']['tmp_name'];
$image = $_FILES['aFile'];

if ($image != null && $image['error'] !== 0) {
    if ($image['error'] === 1)
        throw new Exception('Max upload size exceeded');

    throw new Exception('Image uploading error: INI Error');
}

// DB登録
$insertQuery = "INSERT INTO AREA_INFO(AREA_ID, INFO_NAME, INFO_URL, INFO_IMAGE, INFO_LAT, INFO_LNG, OWNER_ID, UPDATE_DATE) VALUES(:id, :name, :url, :img, :lat, :lng, :owner, now())";

try {
    $pdo = new PDO($dns, $username, $password, $driver_options);
    $statement = $pdo->prepare($insertQuery);
    $statement->bindParam(":id", $id);
    $statement->bindParam(":name", $name);
    $statement->bindParam(":url", $url);
    $statement->bindParam(":img", $imgTmp, PDO::PARAM_LOB);
    $statement->bindParam(":lat", $lat);
    $statement->bindParam(":lng", $lng);
    $statement->bindParam(":owner", $ownerId);

    $statement->execute();

    // コネクションの解放
    $pdo = null;
} catch(Exception $e) {
    print($e->getTraceAsString());
}
// 登録したデータをレスポンスに設定

?>
