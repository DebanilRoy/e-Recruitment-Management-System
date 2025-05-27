<?php
    include "../session/session.php";
    include "dbconn.php";

    $stat = $conn->prepare("SELECT * from ehrms.recruitment;");
    $stat->execute();
    $results = $stat->fetchAll(PDO::FETCH_ASSOC);
    
    if ($results) {
        echo json_encode($results); 
    }
?>