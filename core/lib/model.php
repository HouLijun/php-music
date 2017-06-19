<?php
    namespace core\lib;
    class model extends \PDO
    {
        public function __construct()
        {
            $dsn="mysql:host=localhost;dbname=music;charset=utf8";
            $username="root";
            $passwd='';
            //让默认取出的数组中只包含键值对
            $options=array(
                parent::ATTR_DEFAULT_FETCH_MODE => parent::FETCH_ASSOC
            );
            parent::__construct($dsn, $username, $passwd, $options);
        }
    }