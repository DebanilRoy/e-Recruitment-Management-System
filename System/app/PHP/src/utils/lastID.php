<?php   

    // Retrieves the last inserted ID 
    
    function lastID ($type) {
        global $conn;

        $ref = ["applicant" => ["applicantID", "applicants", "1000000000"],
                "recruitment" => ["recruitmentID", "recruitment", "A100"],
                "application" => ["applicationID", "applications", "A0010000"],
                "appointment" => ["appointmentID", "appointments", "A01000"]];
        
        $id = $ref[$type][0];
        $db = $ref[$type][1];

        $stat = $conn->prepare("SELECT $id FROM $db ORDER BY $id DESC LIMIT 1;");
        $stat->execute();
        $result = $stat->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            return $result[$id];
        }

        else {
            return $ref[$type][2];
        }
        
    }
?>