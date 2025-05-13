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

    $stat = $conn->prepare("CALL get_results(:recruitmentID);");

    try {
        $stat->execute([":recruitmentID" => $recruitmentID]);
        $result = $stat->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode([true, $result]);
        }

        else {
            echo json_encode([true, $result]);
        }
    }
    
    catch (PDOException $e) {
        echo json_encode(false, $e->getCode());
    }

    $conn = null;
?>