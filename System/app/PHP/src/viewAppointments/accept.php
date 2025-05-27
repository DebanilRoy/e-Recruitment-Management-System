<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e){
        echo "Connection Failed";

    }

    $appointmentID = file_get_contents("php://input");
    $appointmentID = json_decode($appointmentID);
    $stat = $conn->prepare("CALL accept(:appointmentID);");

    $result = $stat->execute([":appointmentID" => $appointmentID]);
    
    if ($result) {
        echo json_encode("Accepted");
    }
    
    $conn = null;
?>