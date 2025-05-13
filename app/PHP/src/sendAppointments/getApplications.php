<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e){
        echo "Connection Failed";

    }

    $recruitmentID = file_get_contents("php://input");
    $recruitmentID = json_decode($recruitmentID);

    $stat = $conn->prepare(" SELECT  r.rank,
                                            a.applicationID,
                                            CONCAT(ap.firstName, ' ', ap.lastName) as applicantName,
                                            a.applicantID,
                                            ap.dob,
                                            ap.category,
                                            app.offerStatus,
                                            app.offerFileName
                                    FROM applications a 
                                    INNER JOIN applicants ap ON ap.applicantID = a.applicantID
                                    INNER JOIN ranklist r ON r.applicationID = a.applicationID
                                    LEFT JOIN appointments app ON app.applicationID = a.applicationID
                                    WHERE a.recruitmentID = :recruitmentID
                                    ORDER BY r.rank;");

    $stat->execute([":recruitmentID" => $recruitmentID]);
    $result = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>