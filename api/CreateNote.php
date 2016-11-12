<?php
require '../app/environment.php';
$obj = new ClientNote (
    $_POST['clientId'],
    $_POST['noteSubject'],
    $_POST['noteDescription']
);
// STEP 1: Connect to database
$db = new PDO(DB_CONNECT, DB_USER, DB_PASSWORD);
// STEP 2: Prepare query
$sql = 'INSERT INTO clientNote(clientId, noteSubject, noteDescription) '
    . ' VALUES (?,?,?)';
$statement = $db->prepare($sql);
// STEP 3: Run the query
$success = $statement->execute(
    array(
        $obj->clientId,
        $obj->noteSubject,
        $obj->noteDescription
    )
);
if (!$success) {
    header('HTTP/1.1 500 Error');
    var_dump($statement->errorInfo());
    exit('Bad SQL');
}
// STEP 4: Hande the results
echo json_encode($obj);