<?php
    include "../session/session.php";
    include "../utils/dbconn.php";

    $accountDetails = json_decode(file_get_contents("php://input"));

    $stat = $conn->prepare("SELECT email, mobile FROM applicants WHERE email=:email AND mobile=:mobile;");
    $stat->execute([":email" => $accountDetails->email,
                            ":mobile" => $accountDetails->mobile]);

    $result = $stat->fetch(PDO::FETCH_ASSOC);

    if (empty($result)) {
        echo json_encode(true);
    }
    else {
        echo json_encode(false);
    }

    $conn = null;
?>