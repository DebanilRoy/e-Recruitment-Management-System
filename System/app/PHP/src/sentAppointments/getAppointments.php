<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $recruitmentID = json_decode(file_get_contents("php://input"));

    $stat = $conn->prepare("CALL get_appointments(:recruitmentID)");

    $stat->execute([":recruitmentID" => $recruitmentID]);

    $result = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>