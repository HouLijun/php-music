<?php
namespace app\controller;
use core\uek;
use core\lib\model;
class adminController extends uek
{
    public function __construct()
    {
        session_start();
        if(!isset($_SESSION['login']))
        {
            $this->redirect('/login');
        }
    }
    ////////////////////////////////////////////////////////////
    public function index()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "SELECT * FROM categories";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $row = $stmt->fetchAll();
        $this->assign('cates',$row);
        $this->display(VIEW."admin/categories.html");
    }
    public function getcates()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "SELECT * FROM categories";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $row = $stmt->fetchAll();
        $this->json($row);
    }
    public function add_cate()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "INSERT INTO categories (cate_name) VALUES ('')";
        $stmt = $pdo->prepare($sql);
        if($stmt->execute())
        {
            $id = $pdo->lastInsertId();
            $this->json($id);
        }
        else
        {
            $this->json(0);
        }
    }
    public function del_cate()
    {
        $id = $_GET["id"];
        include LIB."model.php";
        $pdo = new model();
        $sql = "DELETE FROM categories WHERE cate_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$id);
        if($stmt->execute())
        {
            $this->json(1);
        }
        else
        {
            $this->json(0);
        }
    }
    public function update_cate()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "UPDATE categories SET cate_name = ? WHERE cate_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$_POST["val"]);
        $stmt->bindValue(2,$_POST["id"]);
        if($stmt->execute())
        {
            $this->json($_POST["val"]);
        }
        else
        {
            $this->json(0);
        }
    }
    ////////////////////////////////////////////////////////////////
    public function artist()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "SELECT * FROM artist ORDER BY artist_id DESC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $row = $stmt->fetchAll();
        $this->assign('artists',$row);
        $this->display(VIEW."admin/artist.html");
    }
    public function add_artist()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "INSERT INTO artist (artist_name,artist_sex,artist_avatar,artist_age) VALUES ('',1,'','')";
        $stmt = $pdo->prepare($sql);
        if($stmt->execute())
        {
            $id = $pdo->lastInsertId();
            $this->json($id);
        }
        else
        {
            $this->json(0);
        }
    }
    public function del_artist()
    {
        $id = $_GET["id"];
        include LIB."model.php";
        $pdo = new model();
        $sql = "SELECT artist_avatar FROM artist WHERE artist_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$id);
        $stmt->execute();
        $row=$stmt->fetch();
        $dist = UEK.substr($row['artist_avatar'],6);
        if (!empty($row['artist_avatar']))
        {
            if(is_file($dist))
            {
                if(!unlink($dist)){
                    $this->json("Error deleting {$dist}");
                }
            }
        }
        $sql = "DELETE FROM artist WHERE artist_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$id);
        if($stmt->execute())
        {
            $this->json(1);
        }
        else
        {
            $this->json(0);
        }
    }
    public function update_artist()
    {
        include LIB."model.php";
        $pdo = new model();
        $type =$_POST["type"];
        $val=$_POST["val"];
        $id=$_POST["id"];
        $sql = "UPDATE artist SET {$type} = '{$val}' WHERE artist_id = '{$id}'";
        $stmt = $pdo->prepare($sql);
        if($stmt->execute())
        {
            $this->json($_POST["type"]);
        }
        else
        {
            $this->json(0);
        }
    }
    public function upload_file()
    {
        $src = $_FILES['file']['tmp_name'];
        $dist = "/static/images/".$_FILES['file']['name'];
        move_uploaded_file($src,UEK.$dist);
        include LIB."model.php";
        $pdo = new model();
        $sql = "UPDATE artist SET artist_avatar = ?  WHERE artist_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,"/music".$dist);
        $stmt->bindValue(2,$_POST["id"]);
        if($stmt->execute())
        {
            $this->json("/music".$dist);
        }
        else
        {
            $this->json(0);
        }

    }
    ////////////////////////////////////////////////////////
    public function album()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "SELECT * FROM album_list ORDER BY album_id DESC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $row = $stmt->fetchAll();
        $sql = "SELECT * FROM categories";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $cate = $stmt->fetchAll();
        $sql = "SELECT * FROM hot";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $hot = $stmt->fetchAll();
        $this->assign('albums',$row);
        $this->assign('cates',$cate);
        $this->assign('hots',$hot);
        $this->display(VIEW."admin/album.html");
    }
    public function add_album()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "INSERT INTO album (album_name,album_pic,artist_id,cate_id) VALUES ('','',9,1)";
        $stmt = $pdo->prepare($sql);
        if($stmt->execute())
        {
            $this->json($pdo->lastInsertId());
        }
        else
        {
            $this->json(0);
        }
    }
    public function update_album(){
        include LIB."model.php";
        $pdo = new model();
        $type =$_POST["type"];
        $val=$_POST["val"];
        $id=$_POST["id"];
        $sql = "UPDATE album SET {$type} = '{$val}' WHERE album_id = '{$id}'";
        $stmt = $pdo->prepare($sql);
        if($stmt->execute())
        {
            $this->json($_POST["type"]);
        }
        else
        {
            $this->json(0);
        }
    }
    public function get_artist_id()
    {
        include LIB."model.php";
        $pdo = new model();
        $val=$_POST["val"];
        $sql = "SELECT artist_id,artist_name FROM artist WHERE artist_name LIKE ? ORDER BY artist_id DESC";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,'%'.$val.'%');
        $stmt->execute();
        $this->json($stmt->fetchAll());
    }
    public function update_artist_id()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "UPDATE album SET artist_id = ? WHERE album_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$_POST["aid"]);
        $stmt->bindValue(2,$_POST["id"]);
        if($stmt->execute())
        {
            $this->json(200);
        }
        else
        {
            $this->json(0);
        }
    }
    public function upload_file_pic()
    {
        $src = $_FILES['file']['tmp_name'];
        $dist = "/static/images/".$_FILES['file']['name'];
        move_uploaded_file($src,UEK.$dist);
        include LIB."model.php";
        $pdo = new model();
        $sql = "UPDATE album SET album_pic = ?  WHERE album_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,"/music".$dist);
        $stmt->bindValue(2,$_POST["id"]);
        if( $stmt->execute())
        {
            $this->json("/music".$dist);
        }
        else
        {
            $this->json(0);
        }
    }
    public function del_album()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "SELECT album_pic FROM album WHERE album_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$_GET["id"]);
        $stmt->execute();
        $row=$stmt->fetch();
        $dist = UEK.substr($row['album_pic'],6);
        if (!empty($row['album_pic']))
        {
            if(is_file($dist))
            {
                if(!unlink($dist)){
                    $this->json("Error deleting {$dist}");
                }
            }
        }
        $sql = "SELECT music_src FROM music WHERE album_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$_GET["id"]);
        $stmt->execute();
        $row=$stmt->fetchAll();
        foreach($row as $m)
        {
            $dist = UEK.substr($m['music_src'],6);
            if (!empty($row['artist_avatar']))
            {
                if(is_file($dist))
                {
                    if(!unlink($dist)){
                        $this->json("Error deleting {$dist}");
                    }
                }
            }
        }
        $sql = "DELETE FROM album WHERE album_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$_GET["id"]);
        $sql = "DELETE FROM music WHERE album_id = ?";
        $con = $pdo->prepare($sql);
        $con->bindValue(1,$_GET["id"]);
        if($con->execute()&&$stmt->execute())
        {
            $this->json(1);
        }
        else
        {
            $this->json(0);
        }
    }
    ///////////////////////////////////////////////////////////////
    public function get_music()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "SELECT * FROM music WHERE album_id =?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$_GET["id"]);
        $stmt->execute();
        $this->json($stmt->fetchAll());
    }
    public function add_music()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "INSERT INTO music (music_name,music_src,music_duration,album_id) VALUES ('','','',?)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$_GET["id"]);
        if($stmt->execute())
        {
            $this->json($pdo->lastInsertId());
        }
        else
        {
            $this->json(0);
        }
    }
    public function del_music()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "SELECT music_src FROM music WHERE music_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$_GET["id"]);
        $stmt->execute();
        $row=$stmt->fetch();
        $dist = UEK.substr($row['music_src'],6);
        if (!empty($row['music_src']))
        {
            if(is_file($dist))
            {
                if(!unlink($dist)){
                    $this->json("Error deleting {$dist}");
                }
            }
        }
        $sql = "DELETE FROM music WHERE music_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$_GET["id"]);
        if($stmt->execute())
        {
            $this->json(1);
        }
        else
        {
            $this->json(0);
        }
    }
    public function upload_music()
    {
        $src = $_FILES['file']['tmp_name'];
        $name = $_FILES['file']['name'];
        $name=iconv('UTF-8','GB2312',$name);
        $mname = substr($name,0,-4);
        $dist = "/static/musics/".$_FILES['file']['name'];
        move_uploaded_file($src,UEK.$dist);
        $player= new \COM("WMPlayer.OCX");
        $media = $player->newMedia(UEK.$dist);
        $time=$media->duration;
        //转换为分:秒
        $m=floor(($time)/60);
        if($m<10)
        {
            $m="0".$m;
        }
        $s=floor($time-$m*60);
        if($s<10)
        {
            $s="0".$s;
        }
        $t = $m.":".$s;
        include LIB."model.php";
        $pdo = new model();
        $sql = "UPDATE music SET music_src = ?, music_name = ?,music_duration = ? WHERE music_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,"/music".$dist);
        $stmt->bindValue(2,$mname);
        $stmt->bindValue(3,$t);
        $stmt->bindValue(4,$_POST["id"]);
        if( $stmt->execute())
        {
            $this->json(array(
                "name"=>$mname,
                "src"=>"/music".$dist,
                "duration"=>$t
            ));
        }
        else
        {
            $this->json(0);
        }
    }
    /////////////////////////////////////////////////////////////////
    public function add_hot()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "INSERT INTO hot (album_id) VALUES (?)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$_GET["id"]);
        if($stmt->execute())
        {
            $this->json($pdo->lastInsertId());
        }
        else
        {
            $this->json(0);
        }
    }
    public function del_hot()
    {
        include LIB."model.php";
        $pdo = new model();
        $sql = "DELETE FROM hot WHERE hot_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1,$_GET["id"]);
        if($stmt->execute())
        {
            $this->json(1);
        }
        else
        {
            $this->json(0);
        }
    }
}