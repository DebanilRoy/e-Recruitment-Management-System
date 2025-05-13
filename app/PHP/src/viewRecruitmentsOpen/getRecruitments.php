<?php
    include "../session/session.php";
    
    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    
    catch (PDOException $e){
        echo "Connection Failed";

    }

    $userID = $_SESSION['userID'];

    $statRecruitments = $conn->prepare(" SELECT  recruitmentID, 
                                            postName, salary, location, 
                                            date_format(datePublished, '%d/%m/%Y') AS datePublished, 
                                            date_format(appLastDate, '%d/%m/%Y') AS appLastDate 
                                            FROM recruitment
                                            WHERE isActive = true AND isPublished = true AND appLastDate > NOW();");

    $statRecruitments->execute();
    $recruitmentResult = $statRecruitments->fetchAll(PDO::FETCH_ASSOC);

    $statAppliedRecruitments = $conn->prepare("SELECT recruitmentID FROM applications WHERE applicantID = '$userID';");
    $statAppliedRecruitments->execute();
    $appliedResult = $statAppliedRecruitments->fetchAll(PDO::FETCH_ASSOC);

    if ($recruitmentResult) {
        echo json_encode(["recruitments" => $recruitmentResult, "appliedRecruitments" => $appliedResult]);
    }
?>