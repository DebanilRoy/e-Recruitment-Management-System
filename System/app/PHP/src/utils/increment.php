<?php 

// Takes an ID and returns an increment ID

function increment($str) {
    $len = strlen($str);
    $alpha = substr($str, 0, $len/2);
    $numeric = (int)substr($str, $len/2, $len/2);
    $alpha_i = $len/2 - 1;

    // Adds left padding to the numeric half, if needed

    if ($numeric < ((10 ** ($len/2)) - 1)) {
        $numeric = str_pad((string)($numeric + 1), $len/2, '0', STR_PAD_LEFT);
    }    
        
    else {
        $numeric = str_pad("1", strlen($numeric), '0', STR_PAD_LEFT);;

        // If the last character of the alphanumeric half is 'Z', sets to 1

        if ($alpha[$alpha_i] == 'Z') {
            $alpha[$alpha_i] = '1';
            $alpha_i--;
        }
    
        // If any of the remaining characters is 'Z', converts to 0

        while ($alpha_i >= 0 && $alpha[$alpha_i] == 'Z') {
            $alpha[$alpha_i] = '0';
            $alpha_i--;
        }
    
        // If any of the alphanumeric charaters is 9, sets to 'A'

        if ($alpha_i >= 0 && $alpha[$alpha_i] == '9') {
            $alpha[$alpha_i] = 'A';
            $alpha_i--;
        }
        
        else {

            // if any of the above not true, increments the alphamuric 

            if ($alpha_i >= 0) {
                $alpha[$alpha_i] = chr(ord($alpha[$alpha_i]) + 1);
            }
        
            else {
                return "Overflow Error";
                
            }
        }
    }

    // Concatenate and return alphanumeric

    return ($alpha . $numeric);    
}

?>