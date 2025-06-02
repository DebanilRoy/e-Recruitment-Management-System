<?php
    include "../session/session.php";

    $paths = ["recruitment" => "recruitment",
                  "appointments" => "appointments",
                  "photo" => "documents/photo",
                  "dob" => "documents/dob",
                  "qualification" => "documents/qualification",
                  "category" => "documents/category",
                  "address" => "documents/address"];

    $filerequest = json_decode(file_get_contents("php://input"));
    [$fileref, $filetype] = [$filerequest->filename, $filerequest->filetype];

    $filepath = "../../uploads/" . $paths[$filetype] . "/" . $fileref;
    $filesearch = glob($filepath . ".*");

    if (!empty($filesearch)) {
        $file = $filesearch[0];
    }

    else {
        echo json_encode("File Not Found");
        exit;
    }

    if (file_exists($file)) {
        $mimeType = mime_content_type($file);
        header("Content-Type: " . $mimeType);
        header("Content-Disposition: attachment; filename=\"" . basename($file) . "\"");
        readfile($file);
    }

    else {
        echo json_encode($filepath);
    }
?>