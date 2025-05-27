<?php
    include "../session/session.php";
    include "../utils/dbconn.php";
    include "../utils/lastID.php";
    include "../utils/increment.php";

    $id = increment(lastID("applicant"));

    $details = file_get_contents("php://input");
    $details = json_decode($details);

    $details->applicantID = $id;

    $details = json_encode($details);

    $stat = $conn->prepare("CALL register('[$details]');");

    $result = $stat->execute();
    
    if ($result) {
        echo json_encode($id);
    }

    $conn = null;
?>