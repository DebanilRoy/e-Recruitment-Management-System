<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e){
        echo "Connection Failed";

    }

    $stat = $conn->prepare("SELECT recruitmentID from recruitment");
    $stat->execute();

    $results = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($results) {
        $finalResult = array();
        foreach($results as $result) {
            array_push($finalResult, $result['recruitmentID']); 
        }

        echo json_encode($finalResult);
    }

    $conn = null;
?>