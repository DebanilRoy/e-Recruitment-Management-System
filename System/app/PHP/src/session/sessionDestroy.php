<?php
    include 'session.php';

    // Destroys session 

    session_destroy();
    echo json_encode(true);
?>