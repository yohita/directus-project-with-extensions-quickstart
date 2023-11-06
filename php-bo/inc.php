<?php

include __DIR__.'/lib/rb-mysql.php'; 
include __DIR__.'/lib/helper.php';

// read .env file
$_ENV=[];
loadEnv();
//connect to db
R::setup('mysql:host='.getenv('DB_HOST').';dbname='.getenv('DB_DATABASE').';port='.getenv('DB_PORT').'',
getenv('DB_USER'),getenv('DB_PASSWORD'), array( 
        PDO::ATTR_TIMEOUT => 5, // in seconds
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
 
//Fix for Tables containing underscores and caps
R::ext('xdispense', function($type){
	return R::getRedBean()->dispense( $type);
});

//Freezing DB Schema
R::freeze( TRUE ); 
R::useWriterCache(true); 
if($_REQUEST['debug'] ?? '' == 6969){
    $GLOBALS['IS_DEBUG']=true;
    R::debug(true);
    R::fancyDebug(true);
    $IS_CACHE=false;
} else{
    $GLOBALS['IS_DEBUG']=false;
    R::debug(false);
    R::fancyDebug(false);
} 