<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $recruitmentID = $_POST['recruitmentID'];
    $stat = $conn->prepare("CALL get_recruitment_data_ranklist(:recruitmentID);");
    
    $stat->execute([":recruitmentID" => $recruitmentID]);

    $result = $stat->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>