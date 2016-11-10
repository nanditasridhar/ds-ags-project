<?php
require('../app/environment.php');
$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
$statement = $db->prepare(' select * from turbine INNER JOIN turbineDeployed where turbine.turbineId = turbineDeployed.turbineId and turbineDeployed.siteId = ?'); // Warning: This returns *many* rows without the LIMIT!
$success = $statement->execute(
    array(
        $_GET['siteId']
    ));
if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}
$arr = array();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $turbine = new Turbine(
        $row['turbineId'],
        $row['turbineName'],
        $row['turbineDescription'],
        $row['capacity'],
        $row['rampUpTime'],
        $row['maintenanceInterval'],
        $row['turbineDeployedId'],
        $row['siteId'],
        $row['serialNumber'],
        $row['deployedDate'],
        $row['totalFiredHours'],
        $row['totalStarts'],
        $row['lastPlanned'],
        $row['lastUnplannedOutageDate']
    );

    array_push($arr, $turbine);
}
echo json_encode($arr);