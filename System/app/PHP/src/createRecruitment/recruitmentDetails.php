<?php
    include "../session/session.php";
    include "../utils/dbconn.php";
    
    $recruitmentID = json_decode(file_get_contents("php://input"));

    $statSubjects = $conn->prepare("SELECT * FROM subjects 
                                        WHERE recruitmentID = '$recruitmentID'
                                        ORDER BY priority ASC;");
    
    $statSubjects->execute();

    $subjects = $statSubjects->fetchAll(PDO::FETCH_ASSOC);

    if ($subjects) {
        echo json_encode($subjects);
    }

    $conn = null;
?>