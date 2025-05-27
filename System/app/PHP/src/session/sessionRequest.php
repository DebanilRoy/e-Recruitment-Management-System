<?php
    include "session.php";

    if (isset($_SESSION['userID'])) {
        echo json_encode([true, $_SESSION['userID']]);
    }

    else {
        echo json_encode([false, null]);
        
    }
    
?>