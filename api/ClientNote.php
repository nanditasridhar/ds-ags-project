<?php
require('../app/environment.php');
$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
$statement = $db->prepare('SELECT * FROM clientNotes WHERE clientId=?'); // Warning: This returns *many* rows without the LIMIT!
$success = $statement->execute(
    array(
        $_GET['clientId']
    ));
if (!$success) {
    header("HTTP/1.1 500 Error");
    var_dump($statement->errorInfo());
    exit ('Bad SQL');
}
$arr = array();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $clientNote = new ClientNote(
        $row['noteId'],
        $row['clientId'],
        $row['noteSubject'],
        $row['noteDescription']
    );

    array_push($arr, $clientNote);
}
echo json_encode($arr);