<?php
    try {
        $conn = new PDO("mysql:host=codespaces-036119;port=3306;dbname=ehrms", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e) {
        echo "Connection failed";
    }
?>