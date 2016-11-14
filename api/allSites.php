<?php
require('../app/environment.php');
$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
$statement = $db->prepare('SELECT * FROM site'); // Warning: This returns *many* rows without the LIMIT!
$success = $statement->execute();
if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}
$arr = array();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $site = new Site(
        $row['siteId'],
        $row['clientId'],
        $row['siteName'],
        $row['siteDescription'],
        $row['primaryContact'],
        $row['capacity'],
        $row['commercialDate'],
        $row['addrLine1'],
        $row['addrLine2'],
        $row['addrCity'],
        $row['addrState'],
        $row['addrZip'],
        $row['addrCountry']
    );

    array_push($arr, $site);
}
echo json_encode($arr);