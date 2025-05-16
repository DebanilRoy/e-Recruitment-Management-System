<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $stat = $conn->prepare("CALL get_closed_recruitments()");
    $stat->execute();

    $result = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>