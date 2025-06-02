<?php 
    include "../session/session.php";
    include "../utils/dbconn.php";
    include "../utils/lastID.php";
    include "../utils/increment.php";
    include "../utils/uploadFile.php";

    $data = $_POST["applications"];

    $data = json_decode($data);

    [$applications, $userID] = [$data->applications, $data->userID];

    $final = [];
    
    $prevID = lastID("appointment");

    foreach ($applications as $application) {
        $id = increment($prevID);
        array_push($final, ["appointmentID" => $id,
                                            "applicationID" => $application,
                                            "offerFileName" => hash("sha256", $application)]);
        $prevID = $id;
    }

    $stat = $conn->prepare("CALL send_appointment(:applications, :recruiterID)");

    $result = $stat->execute([":applications" => json_encode($final),
                                      ":recruiterID" => $userID]);
    
    if ($result) {
        foreach ($applications as $application) {
            file_upload($_FILES[$application]['tmp_name'], hash("sha256", $application) . "." . pathinfo($_FILES[$application]['name'], PATHINFO_EXTENSION), "appointments");
        }

        echo json_encode($final);
    }

    $conn = null;
?>