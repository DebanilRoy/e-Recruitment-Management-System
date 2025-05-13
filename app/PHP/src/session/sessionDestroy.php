<?php
    include 'session.php';

    session_destroy();
    echo json_encode(true);
?>