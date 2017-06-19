<?php
	namespace core;
	class uek
	{
		public static function run()
		{
			//route
			include(LIB."route.php");
			$o=new \core\lib\route();
			$controller=$o->controller;
			$action=$o->action;
			//controller
			include(CONT.$controller."Controller.php");
			$class_name="\\app\\controller\\{$controller}Controller";
			$send=new $class_name();
			$send->$action();
		}
		public $data=array();
		public function assign($key,$value)
		{
			$this->data[$key]=$value;
		}
		public function display($file)
		{
			extract($this->data);
			include($file);
		}
		public function json($value)
		{
			header('Content-Type: text/json');
			echo json_encode($value);
		}
		public function redirect($url)
		{
			header('Location: http://'.$_SERVER['SERVER_NAME'].$_SERVER['SCRIPT_NAME'].$url);
		}
	}
?>