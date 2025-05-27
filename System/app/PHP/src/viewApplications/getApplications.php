<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    
    catch (PDOException $e){
        echo "Connection Failed";
    }

    $userID = $_SESSION['userID'];

    $stat = $conn->prepare(" CALL get_open_applications(:applicantID)");
    
    $stat->execute([":applicantID" => $userID]);

    $results = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($results) {
        echo json_encode($results);
    }

    $conn = null;
?>