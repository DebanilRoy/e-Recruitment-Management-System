<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e) {
        echo "Connection failed";
    }

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