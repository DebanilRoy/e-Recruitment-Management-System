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

    $stat = $conn->prepare("CALL get_closed_appointments(:applicantID)");

    $stat->execute([":applicantID" => $userID]);
    $result = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>
