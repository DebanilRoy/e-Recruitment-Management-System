<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $userID = $_SESSION['userID'];

    $stat = $conn->prepare(" CALL get_open_applications(:applicantID)");
    
    $stat->execute([":applicantID" => $userID]);

    $results = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($results) {
        echo json_encode($results);
    }

    $conn = null;
?>