<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e){
        echo "Connection Failed";
    }

    $applicantID = $_SESSION['userID'];
    
    $stat = $conn->prepare("CALL get_closed_applications(:applicantID)");
    $stat->execute([":applicantID" => $applicantID]);

    $result = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }
?>