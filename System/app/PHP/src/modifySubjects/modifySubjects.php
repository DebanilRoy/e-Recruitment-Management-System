<?php 
    include "../session/session.php";
    include "../utils/dbconn.php";

    $data = json_decode(file_get_contents("php://input"));

    $recruitmentID = $data->recruitmentID;
    $subjects = $data->subjects;
    
    $stat = $conn->prepare("CALL modify_subjects(:recruitmentID, :subjects)");
    $result = $stat->execute([":recruitmentID" => $recruitmentID,
                            ":subjects" => json_encode($subjects)]);

    if ($result) {
        echo true;
    }

    $conn = null;
?>