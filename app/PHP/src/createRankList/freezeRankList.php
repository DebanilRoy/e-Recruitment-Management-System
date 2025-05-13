<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e){
        echo "Connection Failed";

    }

    $recruitmentID = file_get_contents("php://input");
    $recruitmentID = json_decode($recruitmentID);
    $stat = $conn->prepare("CALL freeze_ranklist(:recruitmentID)");
    

    $result = $stat->execute([":recruitmentID" => $recruitmentID]);

    if ($result) {
        echo json_encode(true);
    }

    else {
        echo json_encode(false);
    }
    $conn = null;
?>