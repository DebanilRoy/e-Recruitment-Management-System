<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $userID = $_SESSION['userID'];

    $stat = $conn->prepare("CALL get_profile(:userID)");
    $stat->execute([":userID" => $userID]);

    $result = $stat->fetch(PDO::FETCH_ASSOC);
    
    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>