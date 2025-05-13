<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e){
        echo "Connection Failed";

    }

    $recruitmentID = $_POST['recruitmentID'];
    
    $statDetails = $conn->prepare(  "SELECT r.postName, r.location, r.vacancyTotal, 
                                    CAST( CASE WHEN SUM(CASE WHEN a.recruitmentID = '$recruitmentID' 
                                    THEN 1 ELSE NULL END) > 0 THEN SUM(CASE WHEN a.recruitmentID = '$recruitmentID' 
                                    THEN 1 ELSE NULL END) ELSE 0 END AS UNSIGNED ) AS applicationCount
                                    FROM recruitment r
                                    LEFT JOIN applications a ON r.recruitmentID = a.recruitmentID
                                    WHERE r.recruitmentID = '$recruitmentID'");

    $statDetails->execute();

    $details = $statDetails->fetch(PDO::FETCH_ASSOC);
  
    if ($details) {
        echo json_encode($details);
    }

    $conn = null;
?>