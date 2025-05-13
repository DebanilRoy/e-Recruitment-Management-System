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

    $stat = $conn->prepare(" SELECT * FROM subjects WHERE recruitmentID='$recruitmentID' 
                                    ORDER BY priority;");
    $stat->execute();

    $subjects = $stat->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($subjects);

    $conn = null;
?>