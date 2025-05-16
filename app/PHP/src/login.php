<?php
    include 'session/session.php';
    include 'utils/dbconn.php';

    $credentials = file_get_contents("php://input");
    $credentials = json_decode($credentials);

    if ($credentials->email == "" && $credentials->pwd == "") {
        echo json_encode([false, -1]);
        exit;
    }

    if ($credentials->accType == "Applicant"){
        $statement = $conn->prepare("CALL applicant_login(:email);");
        $statement->execute([":email" => $credentials->email]);
    }

    else {
        $statement = $conn->prepare("CALL recruiter_login(:email);");
        $statement->execute([":email" => $credentials->email]);
    }

    $result = $statement->fetch(PDO::FETCH_ASSOC);
    
    if ($result != false) {
        $pwdMatch = boolval($credentials->pwd == $result['pwd']);
        switch ("$pwdMatch-$credentials->accType"){           
            case "1-Applicant" :
                $_SESSION['isLogin'] = true;
                $_SESSION['accType'] = "applicant";
                $_SESSION['userID'] = $result['applicantID'];
                echo json_encode([true, 1, $_SESSION['accType']]);
                break;
            
            case "1-Recruiter" :
                $_SESSION['isLogin'] = true;
                $_SESSION['accType'] = "recruiter";
                $_SESSION['userID'] = $result['recruiterID'];
                echo json_encode([true, 1, $_SESSION['accType']]);
                break;
            default:
                echo json_encode([false, -2]);
                break;
        }
    }    

    else {
        echo json_encode([false, -2]);
    }

    $conn = null;
?>