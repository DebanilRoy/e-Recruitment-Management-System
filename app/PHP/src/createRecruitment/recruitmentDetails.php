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

    $statDetails = $conn->prepare("SELECT postName, salary, location, vacancyTotal, appLastDate FROM recruitment 
                                    WHERE recruitmentID = '$recruitmentID';");
    $statDetails->execute();

    $details = $statDetails->fetch(PDO::FETCH_ASSOC);

    $statSubjects = $conn->prepare("SELECT * FROM subjects 
                                        WHERE recruitmentID = '$recruitmentID'
                                        ORDER BY priority ASC;");
    
    $statSubjects->execute();

    $subjects = $statSubjects->fetchAll(PDO::FETCH_ASSOC);

    $response = array($details, $subjects);
    
    if ($details) {
        echo json_encode($response);
    }

    $conn = null;
?>