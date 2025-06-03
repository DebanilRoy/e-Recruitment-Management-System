<?php
    include "../session/session.php";
    include "../utils/lastID.php";
    include "../utils/increment.php";
    include "../utils/dbconn.php";

    $applicationDetails =  file_get_contents("php://input");
    $applicationDetails = json_decode($applicationDetails);
    $applicantID = $_SESSION["userID"];
    
    $id = lastID("application") ? increment(lastID("application")) : "A01001";
    
    $stat = $conn->prepare(" INSERT INTO  applications (  applicationID, applicantID, recruitmentID, alternateMobile, 
                                                                addressFirstLine, addressSecondLine, city, 
                                                                district, state, pinCode ) 
                                    VALUES 
                                        (:applicationID, :applicantID, :recruitmentID, :alternateMobile, 
                                        :addressFirstLine, :addressSecondLine, :city, 
                                        :district, :state , :pinCode);");
    
    $result = $stat->execute([
                                        'applicationID' => $id,
                                        ':applicantID' => $applicationDetails->applicantID, 
                                        ':recruitmentID' => $applicationDetails->recruitmentID, 
                                        ':alternateMobile' => $applicationDetails->alternateMobile, 
                                        ':addressFirstLine' => $applicationDetails->addressFirstLine, 
                                        ':addressSecondLine' => $applicationDetails->addressSecondLine, 
                                        ':city' => $applicationDetails->city, 
                                        ':district' => $applicationDetails->district, 
                                        ':state' => $applicationDetails->state, 
                                        ':pinCode' => $applicationDetails->pinCode
                                    ]
                            );

    if ($result) {
        echo json_encode(true);
    }

    $conn = null;
?>