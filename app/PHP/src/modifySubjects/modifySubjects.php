<?php 
    include "../session/session.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e){
        echo "Connection Failed";

    }

    $recruitmentID = json_decode($_POST['recruitmentID']);
    $subjects = json_decode($_POST['subjects']);
    $delete = json_decode($_POST['deletedSubjects']);
    
    echo json_encode($subjects);
 
    $stat = $conn->prepare("SELECT * FROM subjects;");
    $stat->execute();
    
    $result = $stat->fetchAll(PDO::FETCH_ASSOC); 

    foreach($subjects as $subject) {
        echo "Checking Subject" . json_encode($subject);
        if ($subject->subjectID == "" && $subject->subjectName != "") {
            $insertStat = "INSERT INTO subjects (recruitmentID, subjectName, priority) VALUES";
            $insertStat .= " ('$recruitmentID', '$subject->subjectName', $subject->priority);";
            $insert = $conn->prepare($insertStat);
            if ($insert->execute()) {
                echo "Inserted Successfully";
            }
        }

        else if ($subject->subjectID != "" && $subject->subjectName != ""){
            $updateStat = $conn->prepare("UPDATE subjects SET subjectName = '$subject->subjectName', priority = $subject->priority WHERE subjectID = '$subject->subjectID'; ");
            if ($updateStat->execute()) {
                echo "Update Successful";
            }
        }
    }

    if ($delete > 0) {
        foreach($delete as $row) {
            echo json_encode($row);
            $deleteStat = $conn->prepare("DELETE FROM subjects WHERE subjectID = '$row';");
            if ($deleteStat->execute()) {
                echo "Delete Successful";
            }
        }
    }


?>