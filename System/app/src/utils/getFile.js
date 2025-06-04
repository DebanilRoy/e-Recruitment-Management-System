import $ from 'jquery'

export function getFile(filename, filetype) {
    $.ajax({
        type: "POST",
        url: process.env.REACT_APP_BACKEND_BASE_URL + "/src/utils/getFile.php",
        data: JSON.stringify({filename: filename, filetype: filetype}),
        xhrFields: {
            responseType: 'blob'
        },
        success: (data, textStatus, jqXHR) => {
            const blob = new Blob([data], { type: jqXHR.getResponseHeader("Content-Type") });
            const fileURL = URL.createObjectURL(blob)

            window.open(fileURL, "_blank")
        }
    })
}