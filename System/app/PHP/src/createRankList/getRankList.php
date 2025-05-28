<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $recruitmentID = file_get_contents("php://input");
    $recruitmentID = json_decode($recruitmentID);   
    
    $stat = $conn->prepare("CALL get_ranklist(:recruitmentID);");

    $stat->execute([":recruitmentID" => $recruitmentID]);

    $result = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>