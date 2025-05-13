<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e) {
        echo "Connection failed";
    }

    $applicationID = file_get_contents("php://input");
    $applicationID = json_decode($applicationID);

    $stat = $conn->prepare(" SELECT 	a.applicationID, 
                                            CONCAT(ap.firstName, ' ', ap.lastName) AS applicantName, 
                                            DATE_FORMAT(ap.dob, '%d/%m/%Y') AS 'dob',
                                            ap.category,
                                            ap.qualification,
                                            ap.mobile,
                                            ap.email,
                                            a.addressFirstLine,
                                            a.addressSecondLine,
                                            a.city,
                                            a.district,
                                            a.state,
                                            r.rank
                                    FROM applications a 
                                    INNER JOIN applicants ap ON ap.applicantID = a.applicantID
                                    INNER JOIN ranklist r ON r.applicationID = a.applicationID
                                    WHERE a.applicationID = :applicationID;");
    
    $stat->execute(["applicationID" => $applicationID]);

    $result = $stat->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>