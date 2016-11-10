<?php
require('../app/environment.php');
$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
$statement = $db->prepare(' select * from sensor INNER JOIN sensorDeployed where sensor.sensorId = sensorDeployed.sensorId and sensorDeployed.turbineDeployedId = ?'); // Warning: This returns *many* rows without the LIMIT!
$success = $statement->execute(
    array(
        $_GET['turbineDeployedId']
    ));
if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}
$arr = array();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $sensor = new Sensor(
        $row['sensorId'],
        $row['sensorName'],
        $row['sensorDescription'],
        $row['manufacturer'],
        $row['totalLifeExpectancyHours'],
        $row['sensorDeployedId'],
        $row['turbineDeployedId'],
        $row['serialNumber'],
        $row['deployedDate']
    );

    array_push($arr, $sensor);
}
echo json_encode($arr);