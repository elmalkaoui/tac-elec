<?php


// Get data from form  
$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];
 
$to = "contac@tac-elec.fr";
$subject = $_POST['subject'];
 
$headers = "From: ymelkaoui@gmail.com" . "\r\n" .
            "CC: codeur2018@gmail.com";
if($email != NULL) {
    mail($to, $subject, $message, $headers);
}

header("Location:last.html");
?>