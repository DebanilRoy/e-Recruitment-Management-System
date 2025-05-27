<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e) {
        echo "Connection failed";
    }

    $recruitmentID = json_decode(file_get_contents("php://input"));

    $stat = $conn->prepare(" SELECT 	COUNT(DISTINCT a.applicationID) AS applicationCount, 
                                            CASE
                                                WHEN SUM(CASE WHEN isVerified = 1 THEN 1 ELSE 0 END) IS NULL THEN 0
                                                ELSE SUM(CASE WHEN isVerified = 1 THEN 1 ELSE 0 END) 
                                            END AS 'checked',
                                            
                                            CASE 
                                                WHEN SUM(CASE WHEN verifyStatus = 1 THEN 1 ELSE 0 END) IS NULL THEN 0 
                                                ELSE SUM(CASE WHEN verifyStatus = 1 THEN 1 ELSE 0 END) 
                                            END AS 'verified',
                                            
                                            CASE 
                                                WHEN SUM(CASE WHEN verifyStatus = 0 THEN 1 ELSE 0 END) IS NULL THEN 0 
                                                ELSE SUM(CASE WHEN verifyStatus = 0 THEN 1 ELSE 0 END) 
                                            END AS 'rejected'

                                    FROM recruitment r 
                                    LEFT JOIN applications a ON a.recruitmentID = r.recruitmentID
                                    WHERE r.recruitmentID = :recruitmentID;");

    $stat->execute([":recruitmentID" => $recruitmentID]);

    $result = $stat->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>