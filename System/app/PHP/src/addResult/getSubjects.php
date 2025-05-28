<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $recruitmentID = json_decode(file_get_contents("php://input"));

    $stat = $conn->prepare(" SELECT * FROM subjects WHERE recruitmentID=:recruitmentID 
                                    ORDER BY priority;");
    $stat->execute([":recruitmentID" => $recruitmentID]);

    $subjects = $stat->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($subjects);

    $conn = null;
?>