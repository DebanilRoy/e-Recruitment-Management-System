<?php
    include "../session/session.php";
    include "../utils/dbconn.php";
    
    $userID = $_SESSION['userID'];

    $stat = $conn->prepare("CALL get_appointments(:applicantID)");

    $stat->execute([":applicantID" => $userID]);
    $result = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>
