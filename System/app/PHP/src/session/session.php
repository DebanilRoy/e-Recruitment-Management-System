<?php   
    
    // Starts session and sets required headers
    
    session_start();
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json');
?>