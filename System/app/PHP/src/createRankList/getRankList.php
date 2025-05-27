<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e){
        echo "Connection Failed";
    }

    if (isset($_POST['recruitmentID'])) {
        $recruitmentID = $_POST['recruitmentID'];
    } 

    else {
        $recruitmentID = file_get_contents("php://input");
        $recruitmentID = json_decode($recruitmentID);
    }
    
    
    $stat = $conn->prepare("CALL get_ranklist(:recruitmentID);");

    $stat->execute([":recruitmentID" => $recruitmentID]);

    $result = $stat->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>