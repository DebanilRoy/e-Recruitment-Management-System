<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $resultsData = json_decode(file_get_contents("php://input"));
    
    $stat = $conn->prepare("CALL save_results(:recruitmentID, :results);");

    try {
        $result = $stat->execute([":recruitmentID" => $resultsData->recruitmentID,
                                          ":results" => json_encode($resultsData->results)
                                         ]);

        if ($result) {
            echo json_encode($result);
        }
    }

    catch (PDOException $e) {
        echo $e->getMessage();
    }
        
    $conn = null;
?>