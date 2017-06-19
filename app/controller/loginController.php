<?php
namespace app\controller;
use core\uek;
use core\lib\model;
class loginController extends uek
{
    public function index()
    {
        if(isset($_COOKIE['_useinfo']))
        {
            $hash = $_COOKIE['_useinfo'];
            include LIB . "model.php";
            $pdo = new model();
            $sql = "SELECT * FROM admin_user WHERE hash = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $hash);
            $stmt->execute();
            $row = $stmt->fetch();
            if(!empty($row))
            {
                session_start();
                $_SESSION['login'] = true;
                $this->redirect('/admin');
            }
            else
            {
                $this->display(VIEW . 'admin/logo.html');
            }
        }else
        {
            $num = rand(1000, 9999);
            session_start();
            $_SESSION['check'] = $num;
            $this->assign('num',$num);
            $this->display(VIEW . 'admin/logo.html');
        }
    }
    public function change(){
        $num = rand(1000, 9999);
        session_start();
        $_SESSION['check'] = $num;
        $this->json($num);
    }
    public function logout()
    {
        session_start();
        unset($_SESSION['login']);
        setcookie("_useinfo",$row['hash'],time()-3600,"/");
        $this->redirect('/login');
    }
    public function check_login()
    {
        include LIB . "model.php";
        $pdo = new model();
        $sql = "SELECT * FROM admin_user WHERE account = ? AND password = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $_POST['account']);
        $stmt->bindValue(2, md5($_POST['password']));
        $stmt->execute();
        $row = $stmt->fetch();
        session_start();
        if (!empty($row))
        {
            if($_POST['check']==$_SESSION['check'])
            {
                if(isset($_POST['remember']))
                {
                    setcookie("_useinfo", $row['hash'], time() + 3600, "/");
                }
                $_SESSION['login'] = true;
                $result = array(
                    'state' => 200,
                    'error' => null
                );
                $this->json($result);
            }
            else
            {
                $result = array(
                    'state'=>404,
                    'error'=>'验证码不正确'
                );
                $this->json($result);
            }
        }
        else
        {
            $result = array(
                'state'=>404,
                'error'=>'密码不正确'
            );
            $this->json($result);
        }
        unset($_SESSION['check']);
    }
    public function checkname(){
        include LIB . "model.php";
        $pdo = new model();
        $sql = "SELECT account FROM admin_user WHERE account = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $_GET['name']);
        $stmt->execute();
        $row = $stmt->fetch();
        if(!empty($row)){
            $result = array(
                'state'=>200,
                'error'=>null
            );
            $this->json($result);
        }else{
            $result = array(
                'state'=>404,
                'error'=>'账号不存在'
            );
            $this->json($result);
        }
    }
}