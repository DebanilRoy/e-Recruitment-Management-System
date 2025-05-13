<?php 
    include "../session/session.php";
    include "../utils/lastID.php";
    include "../utils/increment.php";

    try {
        $conn = new PDO("mysql: host=localhost;port=3306;dbname=ehrms", "root", "thisismine");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e){
        echo "Connection Failed";
    }

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
            move_uploaded_file($_FILES[$application]['tmp_name'], ("../../uploads/appointments/" . hash("sha256", $application) . ".jpg"));
        }

        echo json_encode($final);
    }

    $conn = null;
?>