<?php
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e){
        echo "Connection Failed";

    }

    $recruitmentID = json_decode(file_get_contents("php://input"));

    $statSubjects = $conn->prepare("SELECT * FROM subjects 
                                        WHERE recruitmentID = '$recruitmentID'
                                        ORDER BY priority ASC;");
    
    $statSubjects->execute();

    $subjects = $statSubjects->fetchAll(PDO::FETCH_ASSOC);

    if ($subjects) {
        echo json_encode($subjects);
    }

    $conn = null;
?>