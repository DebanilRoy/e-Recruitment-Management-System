<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

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