<?php
require('../app/environment.php');
$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
$sql = 'SELECT * FROM client WHERE clientId = ?';
$statement = $db->prepare($sql);
// Passing in an array of values from the HTTP request
// One value per question mark, and in the same order
$success = $statement->execute(
    array(
        $_GET['clientId']
    )
);
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