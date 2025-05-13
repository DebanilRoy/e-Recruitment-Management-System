<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    
    catch (PDOException $e){
        echo "Connection Failed";
    }

    $applicationID = file_get_contents("php://input");
    $applicationID = json_decode($applicationID);

    $stat = $conn->prepare("CALL cancel_application(:applicationID);");
    $result = $stat->execute([":applicationID" => $applicationID]);

    if ($result){
        echo json_encode("Cancelled");
    }
?>