<?php
    include '../session/session.php';
    include '../utils/dbconn.php';
    include '../utils/increment.php';
    include '../utils/lastID.php';

    $attempt = 5;
    $success = false;

    $recruitmentInfo = json_decode(file_get_contents("php://input"));
    $recruitmentInfo->createdBy = $_SESSION['userID'];
    
    if (lastID("recruitment")) {
        $recruitmentInfo->recruitmentID = increment(lastID("recruitment"));
    }
    
    else {
        $prevID = "A001";
    }

    echo json_encode($recruitmentInfo);

    $stat = $conn->prepare("CALL create_recruitment(:recruitmentInfo)");
    
    //while ($attempt > 0 && !$success) {
        //try {
            $result = $stat->execute([":recruitmentInfo" => json_encode($recruitmentInfo)]);
            
            if ($result) {
                echo json_encode(true);
            }

            $success = true;
        //}
        
        /*catch (Exception $e) {
            if ($e->getCode() == 23000) {
                $recruitmentInfo->recruitmentID = increment($recruitmentInfo->recruitmentID);
                $attempt--;
            }

            else {
                echo $e;
            }
        } */ 
    //}

    $conn = null;
?>