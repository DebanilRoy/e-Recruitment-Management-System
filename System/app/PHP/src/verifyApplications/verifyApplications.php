<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $data = file_get_contents("php://input");
    $data = json_decode($data);

    $action = $data[0];
    $applications = $data[1];

    $index = implode(',',  array_fill(0, count($applications), '?'));
    
    if ($action == "verify") {
        $stat = $conn->prepare(" UPDATE applications 
        SET isVerified = true,
            verifyStatus = 1
        WHERE applicationID IN ($index)");
    }

    else {
        $stat = $conn->prepare(" UPDATE applications 
        SET isVerified = true,
            verifyStatus = -1
        WHERE applicationID IN ($index)");
    }
    
    $result = $stat->execute($applications);
    
    if ($result) {
        echo json_encode($index);
    }

    $conn = null;
?>