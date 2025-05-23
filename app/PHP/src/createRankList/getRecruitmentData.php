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
    $stat = $conn->prepare("CALL get_recruitment_data_ranklist(:recruitmentID);");
    
    $stat->execute([":recruitmentID" => $recruitmentID]);

    $result = $stat->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>