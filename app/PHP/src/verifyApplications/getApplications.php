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

    $stat = $conn->prepare("CALL get_applications_verify(:recruitmentID)");
    $stat->execute([":recruitmentID" => $recruitmentID]);

    $result = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>