<?php
    include "../session/session.php";
    include "../utils/dbconn.php";
    include "../utils/lastID.php";
    include "../utils/increment.php";
    include "../utils/uploadFile.php";
    $id = increment(lastID("applicant"));

    $details = json_decode($_POST['applicantDetails']);

    $details->applicantID = $id;

    $details = json_encode($details);

    $stat = $conn->prepare("CALL register('[$details]');");

    $result = $stat->execute();
    
    if ($result) {
        $isPasswordSaved = file_get_contents("savePassword.php");
        if ($isPasswordSaved) {
            file_upload($_FILES['photo']['tmp_name'], hash("sha256", $id) . "." . pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION), "photo");
            file_upload($_FILES['dobproof']['tmp_name'], hash("sha256", $id) . "." . pathinfo($_FILES['dobproof']['name'], PATHINFO_EXTENSION), "dob");
            file_upload($_FILES['qualproof']['tmp_name'], hash("sha256", $id) . "." . pathinfo($_FILES['qualproof']['name'], PATHINFO_EXTENSION), "qualification");
            file_upload($_FILES['catproof']['tmp_name'], hash("sha256", $id) . "." . pathinfo($_FILES['catproof']['name'], PATHINFO_EXTENSION), "category");
            file_upload($_FILES['addressproof']['tmp_name'], hash("sha256", $id) . "." . pathinfo($_FILES['addressproof']['name'], PATHINFO_EXTENSION), "address");        
        
            echo json_encode(true);
        }

        else {
            echo json_encode([false, "password"]);
        }
        
    }

    $conn = null;
?>