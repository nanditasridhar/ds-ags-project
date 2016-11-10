<?php
require('../app/environment.php');
$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
$statement = $db->prepare('SELECT * FROM client'); // Warning: This returns *many* rows without the LIMIT!
$success = $statement->execute();
if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}
$arr = array();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $client = new Client(
        $row['clientId'],
        $row['clientName'],
        $row['clientDescription'],
        $row['gicsSector'],
        $row['gicsSubIndustry'],
        $row['headquarters']
    );

    array_push($arr, $client);
}
echo json_encode($arr);