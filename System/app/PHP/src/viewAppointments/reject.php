<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $appointmentID = file_get_contents("php://input");
    $appointmentID = json_decode($appointmentID);
    $stat = $conn->prepare("CALL reject(:appointmentID);");

    $result = $stat->execute([":appointmentID" => $appointmentID]);
    
    if ($result) {
        echo json_encode("Rejected");
    }
    
    $conn = null;
?>