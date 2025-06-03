<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $applicantID = $_SESSION['userID'];
    
    $stat = $conn->prepare("CALL get_closed_applications(:applicantID)");
    $stat->execute([":applicantID" => $applicantID]);

    $result = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }
?>