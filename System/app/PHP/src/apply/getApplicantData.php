<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $userID = $_SESSION['userID'];
    $stat = $conn->prepare("SELECT email, mobile, alternateMobile, firstName, lastName, dob, qualification, category, addressFirstLine, addressSecondLine, city, district, state, pinCode FROM applicants WHERE applicantID='$userID';");
    $stat->execute();

    $result = $stat->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }

    $conn = null;
?>