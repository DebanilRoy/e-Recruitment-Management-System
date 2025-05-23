<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e){
        echo "Connection Failed";
    }

    $resultsData = file_get_contents("php://input");

    $stat = $conn->prepare("CALL save_results('$resultsData');");

    try {
        $result = $stat->execute();

        if ($result) {
            echo json_encode($result);
        }
    }

    catch (PDOException $e) {
        echo $e->getCode();
    }
    
    
    $conn = null;
?>