<?php
    include "../session/session.php";
    $fileTypes = ['advert', 'appointments'];

    $filerequest = file_get_contents("php://input");
    $filerequest = json_decode($filerequest);
    [$filename, $filetype] = [$filerequest->filename, $filerequest->filetype];

    $filepath = "../../uploads/" . $filetype . "/" . $filename . ".jpg";

    if (file_exists($filepath)) {
        $mimeType = mime_content_type($filepath);
        header("Content-Type: " . $mimeType);
        header("Content-Disposition: attachment; filename=\"" . $filepath);
        readfile($filepath);
    }
    else {
        echo json_encode($filepath);
    }
?>