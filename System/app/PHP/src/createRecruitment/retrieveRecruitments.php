<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

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