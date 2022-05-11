<?php

$server ='localhost';
$username ='root';
$passwoerd ='';
$database='jobs';

$conn= mysqli_connect($server,$username,$passwoerd, $database);

if($conn->connect_error){
    die("connection failed".$conn->connect_error);
}
echo"";



session_start();
if(isset($_POST['login'])){
    $email=$_POST['email'];
    $password=$_POST['password']; 

    $query="SELECT * FROM `users` WHERE `email`='$email' AND `password`='$password'";

    $result=mysqli_query($conn, $query);
    $row=mysqli_fetch_array($result, MYSQLI_ASSOC);
    if(mysqli_num_rows($result)==1){
        header("location:index.php");
    }
    else{
        // $error='email id or password is incorrect'; 
        echo "email id or password is incorrect";
    }
}
if(isset ($_POST['submit'])){
    $name=$_POST['fullname'];
    $email=$_POST['email'];
    $number=$_POST['number'];
    $password=$_POST['password']; 
    
    $sql = "INSERT INTO `users`(`name`, `email`, `number`, `password`) VALUES ('$name', '$email', '$number', '$password')";

    if(mysqli_query($conn, $sql)){
        echo"record entered successfully";
        header("Location: register_success.php");
        exit();
        
    }
    else{
        echo"ERROR : not able to execute $sql". mysqli_error($conn);
    }
}

if(isset ($_POST['submit_job'])){
    $cname=$_POST['cname'];
    $posi=$_POST['position'];
    $jdesc=$_POST['jdesc'];
    $ctc=$_POST['ctc']; 
    
    $sql_job = "INSERT INTO `job`(`cname`, `position`, `jdescription`, `ctc`) VALUES ('$cname','$posi','$jdesc','$ctc')";

    if(mysqli_query($conn, $sql_job)){
        echo"record entered successfully
        Go back to post another job
        <script>
         setTimeout(function(){
            window.location.href = 'index.php';
         }, 2000);
      </script>";
        
        
        
    }
    else{
        echo"ERROR : not able to execute $sql". mysqli_error($conn);
    }
}
if(isset ($_POST['apply'])){
    $name=$_POST['name'];
    $quali=$_POST['quali'];
    $why=$_POST['why'];
    $edu=$_POST['edu']; 
    $company=$_POST['company'];
    
    $sql_apply = "INSERT INTO `candidates`( `name`, `quali`, `why`, `education`, `cname`) VALUES ('$name',' $quali','$why','$edu', '$company')";

    if(mysqli_query($conn, $sql_apply)){
        echo"Applied successfully
        <script>
         setTimeout(function(){
            window.location.href = 'career.php';
         }, 2000);
      </script>";
        
        
        
    }
    else{
        echo"ERROR : not able to execute $sql". mysqli_error($conn);
    }
}
mysqli_close($conn);
?>