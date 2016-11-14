<?php
require('../app/environment.php');
$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
$statement = $db->prepare(' select * from sensor'); // Warning: This returns *many* rows without the LIMIT!
$success = $statement->execute();
if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}
$arr = array();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $sensor = new SensorListing(
        $row['sensorId'],
        $row['sensorName'],
        $row['sensorDescription'],
        $row['manufacturer'],
        $row['totalLifeExpectancyHours']
    );

    array_push($arr, $sensor);
}
echo json_encode($arr);