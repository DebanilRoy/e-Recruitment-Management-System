<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $recruitmentID = json_decode(file_get_contents("php://input"));

    $stat = $conn->prepare("CALL get_recruitment_details_appointments(:recruitmentID)");

    $stat->execute([":recruitmentID" => $recruitmentID]);

    try {
        $result = $stat->fetch(PDO::FETCH_ASSOC);
           
        if ($result) {
            echo json_encode($result);
        }
    }

    catch (Exception $e){
        echo json_encode($e);
    }
    
    $conn = null;
?>