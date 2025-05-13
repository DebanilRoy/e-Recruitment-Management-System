<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $userID = $_SESSION['userID'];

    $profile = file_get_contents("php://input");

    $stat = $conn->prepare("CALL edit_profile(:userID, :profile)");

    $result = $stat->execute([":userID" => $userID,
                                        ":profile" => $profile]);

    if ($result) {
        echo json_encode("Profile Edited");
    }
    
    $conn = null;
?>