<?php 
function increment($str) {
    $len = strlen($str);
    $alpha = substr($str, 0, $len/2);
    $numeric = (int)substr($str, $len/2, $len/2);
    $alpha_i = $len/2 - 1;

    if ($numeric < ((10 ** ($len/2)) - 1)) {
        $numeric = str_pad((string)($numeric + 1), $len/2, '0', STR_PAD_LEFT);
    }    
        
    else {
        $numeric = str_pad("1", strlen($numeric), '0', STR_PAD_LEFT);;

        if ($alpha[$alpha_i] == 'Z') {
            $alpha[$alpha_i] = '1';
            $alpha_i--;
        }
    
        while ($alpha_i >= 0 && $alpha[$alpha_i] == 'Z') {
            $alpha[$alpha_i] = '0';
            $alpha_i--;
        }
    
        if ($alpha_i >= 0 && $alpha[$alpha_i] == '9') {
            $alpha[$alpha_i] = 'A';
            $alpha_i--;
        }
        
        else {
            if ($alpha_i >= 0) {
                $alpha[$alpha_i] = chr(ord($alpha[$alpha_i]) + 1);
            }
        
            else {
                return "Overflow Error";
                
            }
        }
    }

    return ($alpha . $numeric);    
}

?>