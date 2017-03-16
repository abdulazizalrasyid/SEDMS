<?php defined('BASEPATH') or exit('No direct script access allowed');
require_once APPPATH.'/third_party/PHPWord.php';
Class Word extends PHPWord {
	public function __construct(){
		parent::__construct();
	}
}