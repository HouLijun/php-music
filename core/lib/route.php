<?php
	namespace core\lib;
	class route
	{
		public $controller;
		public $action;
		public function __construct()
		{
			$uri=$_SERVER["REQUEST_URI"];
			if( $uri==='/music/index.php' )
			{
				$this->controller='index';
				$this->action="index";
				return;
			}
			$path_array=explode("/",$uri);
			$this->controller=$path_array[3];
			if(empty($path_array[4]))
			{
				$this->action='index';
			}else
			{
				$this->action=$path_array[4];
			}
			if(isset($path_array[5])&&isset($path_array[6])){
				$_GET[$path_array[5]] = $path_array[6];
			}
		}
	}
?>