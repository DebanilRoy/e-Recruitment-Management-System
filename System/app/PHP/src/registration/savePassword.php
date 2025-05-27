<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $details = file_get_contents("php://input");

    $stat = $conn->prepare("CALL save_password('$details')"); 

    $result = $stat->execute();

    if ($result) {
        echo $details;
    }

    $conn = null;
?>