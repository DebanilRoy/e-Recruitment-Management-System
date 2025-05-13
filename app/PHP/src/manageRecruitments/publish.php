<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $recruitmentID = json_decode(file_get_contents("php://input"));
    $stat = $conn->prepare(" UPDATE recruitment
                                    SET isPublished = 1,
                                        datePublished = NOW()
                                    WHERE recruitmentID = :recruitmentID");

    $result = $stat->execute([":recruitmentID" => $recruitmentID]);

    if ($result) {
        echo json_encode(true);
    }

    $conn = null;
?>