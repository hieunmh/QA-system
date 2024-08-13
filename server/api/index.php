<?php

require __DIR__. "/../public/index.php";
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';


if (file_exists(__DIR__.'/../public/'.$_SERVER['REQUEST_URI'])) {
  return false; // Return the file directly if it exists
}
