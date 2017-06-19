<?php
    namespace app\controller;
    use core\uek;
    use core\lib\model;



    class indexController extends uek
    {
        public function index()
        {
            include (LIB."model.php");
            $db = new model();
            $con = $db->prepare("SELECT * FROM categories");
            $con->execute();
            $nav = $con->fetchAll();
            $con = $db->prepare("SELECT h.album_id,album_name,album_pic,artist_name
                                 FROM artist AS a,hot AS h,album AS b
                                 WHERE h.album_id = b.album_id AND b.artist_id = a.artist_id
                                 LIMIT 12");
            $con->execute();
            //只得一条数据用fetch
            $m = $con->fetchAll();
            $this->assign('lists',$nav);
            $this->assign('musics',$m);
            $this->display(VIEW.'index/index.html');
        }
        public function play()
        {
            $this->display(VIEW.'index/play.html');
        }
        public function getmusic()
        {
            include (LIB."model.php");
            $album_id = $_GET["id"];
            $db = new model();
            $c = $db->prepare("SELECT m.music_id,m.music_name,m.music_src,m.music_duration,r.artist_name,a.album_pic,a.album_name
                               FROM music AS m,artist AS r,album AS a
                               WHERE a.album_id=? AND a.artist_id=r.artist_id AND a.album_id=m.album_id;");
            $c->bindValue(1,$album_id);
            $c->execute();
            $music = $c->fetchAll();
            echo json_encode($music);
        }
        public function getalbum()
        {
            include (LIB."model.php");
            $cate_id = $_GET["id"];
            $db = new model();
            $c = $db->prepare("SELECT r.artist_name,a.album_pic,a.album_name,a.album_id
                               FROM artist AS r,album AS a
                               WHERE a.cate_id=? AND a.artist_id=r.artist_id
                               LIMIT 12;");
            $c->bindValue(1,$cate_id);
            $c->execute();
            $album = $c->fetchAll();
            echo json_encode($album);
        }
        public function getall()
        {
            include (LIB."model.php");
            $db = new model();
            $c = $db->prepare("SELECT h.album_id,album_name,album_pic,artist_name
                               FROM artist AS a,hot AS h,album AS b
                               WHERE h.album_id = b.album_id AND b.artist_id = a.artist_id
                               LIMIT 12;");
            $c->execute();
            $album = $c->fetchAll();
            echo json_encode($album);
        }
    }