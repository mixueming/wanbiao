<?php
    header('content-type:text/html;charset=utf-8;');
    $username = $_POST['username'];
    $password = $_POST['password'];

    $link = mysqli_connect('localhost', 'root', 'root', 'users');
    $sql = "SELECT * FROM `user` WHERE `username` = '$username' AND `password` = '$password'";
    $res = mysqli_query($link, $sql);
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
    mysqli_close($link);

    if(count($data)){
        echo json_encode(array(
            "message" => "注册成功",
            "code" => 1,
            "nickname" => $data[0]['nickname']
        ));
    }else{
        echo json_encode(array(
            "message" => "注册失败",
            "code" => 0
        ));
    }
?>