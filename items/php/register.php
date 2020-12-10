<?php
    // error_reporting(0);
    header('content-type:text/html;charset=utf-8;');
    $username = $_POST['username'];
    $password = $_POST['password'];

    $link = mysqli_connect('localhost', 'root', 'root', 'users');
    $sql = "SELECT * FROM `user` WHERE `username` = '$username'";
    $res = mysqli_query($link, $sql);
    $data = mysqli_fetch_all($res,MYSQLI_ASSOC);

    if(count($data)){
        echo json_encode(array(
                "code" => 2
            ));
    }else{
        $sql = "INSERT INTO `user` (`username`, `password`,`nickname`) VALUES ('$username', '$password', '$username')";
        $res = mysqli_query($link, $sql);
        if($res === true){
            echo json_encode(array(
                "message" => "注册成功",
                "code" => 1
              ));
        }else{
            echo json_encode(array(
                "message" => "注册失败",
                "code" => 0
              ));
        }
    }

?>