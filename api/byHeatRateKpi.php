<?php
require('../app/environment.php');
$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
$statement = $db->prepare(' select sensorDeployedId, dataCollectedDate, heatRate from sensorTimeSeries where sensorDeployedId = ?'); // Warning: This returns *many* rows without the LIMIT!
$success = $statement->execute(
    array(
        $_GET['sensorDeployedId']
    ));
if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}
$arr = array();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $sensorTimeSeries = new SensorTimeSeriesData(
        $row['sensorDeployedId'],
        $row['dataCollectedDate'],
        $row['heatRate']
    );

    array_push($arr, $sensorTimeSeries);
}
echo json_encode($arr);