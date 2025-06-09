<?php
    
    // Associative array for mapping filepath

    $paths = [  "recruitment" => "recruitment",
                "appointments" => "appointments",
                "photo" => "documents/photo",
                "dob" => "documents/dob",
                "qualification" => "documents/qualification",
                "category" => "documents/category",
                "address" => "documents/address"];

    // Function for file uploading
    
    function file_upload($filepath, $basename, $filetype) {
        global $paths;
        
        move_uploaded_file($filepath, ("../../uploads/" . $paths[$filetype] . "/" . $basename));
    }
?>