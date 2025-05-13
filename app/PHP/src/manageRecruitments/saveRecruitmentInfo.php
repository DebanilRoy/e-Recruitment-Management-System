<?php
    include "../session/session.php";
    
    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    
    catch (PDOException $e){
        echo "Connection Failed";
    }

    $recruitmentInfo = $_POST['recruitmentInfo'];

    $recruitmentID = json_decode($recruitmentInfo)->recruitmentID;

    if (isset($_FILES[$recruitmentID])) {
        $filepath = "../../uploads/" . "recruitment/" . hash("sha256" , $recruitmentID);
        if (file_exists($filepath . ".jpg")) {
            $hash1 = hash_file("sha256", $filepath . ".jpg");
            $hash2 = hash_file("sha256", $_FILES[$recruitmentID]['tmp_name']);
        
            if ($hash1 != $hash2) {
                unlink($filepath);
                move_uploaded_file($_FILES[$recruitmentID]['tmp_name'], $filepath . ".jpg");
            }
        }
        move_uploaded_file($_FILES[$recruitmentID]['tmp_name'], $filepath . ".jpg");
    }

    $stat = $conn->prepare("CALL edit_recruitment_info('[$recruitmentInfo]')");

    $result = $stat->execute();

    if ($result) {
        echo json_encode($result);
    }

    $conn = null
?>