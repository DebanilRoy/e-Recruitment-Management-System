<?php   
    function lastID ($type) {
        global $conn;

        $ref = ["applicant" => ["applicantID", "applicants"],
                "recruitment" => ["recruitmentID", "recruitment"],
                "application" => ["applicationID", "applications"],
                "appointment" => ["appointmentID", "appointments"]];
        
        $id = $ref[$type][0];
        $db = $ref[$type][1];

        $stat = $conn->prepare("SELECT $id FROM $db ORDER BY $id DESC LIMIT 1;");
        $stat->execute();
        $result = $stat->fetch(PDO::FETCH_ASSOC);

        return $result[$id];
    }
?>