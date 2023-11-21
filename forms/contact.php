<?php

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	
	require '../assets/vendors/PHPMailer/src/Exception.php';
	require '../assets/vendors/PHPMailer/src/PHPMailer.php';
	require '../assets/vendors/PHPMailer/src/SMTP.php';

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
			try{
				// Create a new PHPMailer instance
				$mail = new PHPMailer(true);
	
				// Server settings
				$mail->isSMTP();
				$mail->Host       = 'ex5.mail.ovh.net'; // Your SMTP server
				$mail->SMTPAuth   = true;
				$mail->Username   = 'contact@tac-elec.fr'; // Your SMTP username
				$mail->Password   = 'Amir04012020!'; // Your SMTP password
				$mail->SMTPSecure = 'tls'; // Enable TLS encryption; `ssl` also accepted
				$mail->Port       = 587; // TCP port to connect to
		
	            $name = $_POST['name'];
	            $email = $_POST['email'];
	            $message = $_POST['message'];
	            $subject = $_POST['subject'];
	    	        
	            $email_message = "Name: $name\n";
	            $email_message .= "Email: $email\n";
	            $email_message .= "Subject: $subject\n";
	            $email_message .= "Message:\n$message";     
				
				 // Recipients
				$mail->setFrom('contact@tac-elec.fr', 'www.tac-elec.fr');
			    $mail->addAddress('contact@tac-elec.fr', 'Contact Tac-elec');
				$mail->AddCC($email);
				// Content
				$mail->Subject = $subject;
				$mail->Body = $email_message;
	
				// Send the email
				$mail->send();
				echo json_encode(['success' => true, 'error' => 'mail is sent']);
			} catch (Exception $ex) {
				echo json_encode(['success' => false, 'error' => 'Invalid request method']);
			}
	}
?>
