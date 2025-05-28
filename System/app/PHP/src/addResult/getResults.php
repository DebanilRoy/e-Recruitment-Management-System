<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $recruitmentID = $_POST['recruitmentID'];

    $stat = $conn->prepare("CALL get_results(:recruitmentID);");

    try {
        $stat->execute([":recruitmentID" => $recruitmentID]);
        $result = $stat->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode([true, $result]);
        }

        else {
            echo json_encode([true, $result]);
        }
    }
    
    catch (PDOException $e) {
        echo json_encode(false, $e->getCode());
    }

    $conn = null;
?>