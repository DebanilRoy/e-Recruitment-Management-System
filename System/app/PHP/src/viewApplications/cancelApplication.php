<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $applicationID = file_get_contents("php://input");
    $applicationID = json_decode($applicationID);

    $stat = $conn->prepare("CALL cancel_application(:applicationID);");
    $result = $stat->execute([":applicationID" => $applicationID]);

    if ($result){
        echo json_encode("Cancelled");
    }
?>