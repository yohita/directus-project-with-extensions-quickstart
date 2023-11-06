<?php
function loadEnv($path=__DIR__.'/../../'): void
{
 global $_ENV;
    $lines = file($path . '/.env');
    foreach ($lines as $line) {
           if (strpos(trim($line), '#') === 0) {
             continue;
           }
         //if string contains "="
           if (strpos($line, '=') !== false) {  
        [$key, $value] = explode('=', $line, 2);
        $key = trim($key??'');
        $value = trim($value??'');
        //remove all double quotes from value start and end
        $value = trim($value, '"');
//         echo $key.':'.$value.' : '.PHP_EOL;
        putenv(sprintf('%s=%s', $key, $value));
        $_ENV[$key] = $value;
        $_SERVER[$key] = $value;
           }
    }
}
    function get_youtube_id_from_url($yt_url){
        $yt_id = "";
        $yt_regex = '/[\\?\\&]v=([^\\?\\&]+)/';
        preg_match($yt_regex, $yt_url, $yt_match);
        if (isset($yt_match[1])) {
            $yt_id = $yt_match[1];
        }
        return $yt_id;
    }

    function get_programs($type='all', $limit=20){
        global $PORTAL_ASSETS_URL;
        $items=[];
        switch($type){
            case 'homeslider':
                $items=R::getAll('select * from programmes where is_homeslider=1 limit '.$limit);
                break;
            case 'all':
                $items=R::getAll('select * from programmes limit '.$limit);
                break;
            default:
                $items=R::getAll('select * from programmes  limit '.$limit);
                break;
        }
        
        for($i=0;$i<sizeof($items);$i++){
           if($items[$i]['banner']){
              $items[$i]['image_url']=$PORTAL_ASSETS_URL.'/'.$items[$i]['banner'];
           }else if( $items[$i]['trailer_youtube']){
              $items[$i]['image_url']='https://img.youtube.com/vi/'.get_youtube_id_from_url($items[$i]['trailer_youtube']).'/maxresdefault.jpg'; 
           }
        }
        return $items;
    }

    function uuidv4($data = null) {
        // Generate 16 bytes (128 bits) of random data or use the data passed into the function.
        $data = $data ?? random_bytes(16);
        assert(strlen($data) == 16);
    
        // Set version to 0100
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        // Set bits 6-7 to 10
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    
        // Output the 36 character UUID.
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }


    // replace any non-ascii character with its hex code.
function mbescape($value) {
    $return = '';
    for($i = 0; $i < strlen($value); ++$i) {
        $char = $value[$i];
        $ord = ord($char);
        if($char !== "'" && $char !== "\"" && $char !== '\\' && $ord >= 32 && $ord <= 126)
            $return .= $char;
        else
            $return .= '\\x' . dechex($ord);
    }
    return $return;
}
?>