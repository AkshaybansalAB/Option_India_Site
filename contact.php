<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
// Allow CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Load PHPMailer via Composer
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require 'vendor/autoload.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// SMTP credentials
$SMTP_EMAIL = "optionsindia2025@gmail.com";
$SMTP_PASSWORD = "pzozcnvzqjrspnut";
$CLIENT_EMAIL = "optionsindia2025@gmail.com";

// Get JSON POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate inputs
if (!isset($data['name'], $data['email'], $data['phone'], $data['message'])) {
    http_response_code(400);
    echo json_encode(["message" => "All fields are required"]);
    exit;
}

// Sanitize inputs
$name    = htmlspecialchars(trim($data['name']));
$email   = htmlspecialchars(trim($data['email']));
$phone   = htmlspecialchars(trim($data['phone']));
$message = htmlspecialchars(trim($data['message']));

// Prepare email
$subject = "New Contact Form Submission";
$body    = "
<h2>Contact Form Submission</h2>
<p><strong>Name:</strong> $name</p>
<p><strong>Phone:</strong> $phone</p>
<p><strong>Email:</strong> $email</p>
<p><strong>Message:</strong><br>$message</p>
";

$mail = new PHPMailer(true);

try {
    // SMTP setup
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $SMTP_EMAIL;
    $mail->Password   = $SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Optional: Avoid SSL issues
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer'       => false,
            'verify_peer_name'  => false,
            'allow_self_signed' => true
        ]
    ];

    // Recipients
    $mail->setFrom($SMTP_EMAIL, 'Contact Form');
    $mail->addAddress($CLIENT_EMAIL);

    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $body;

    $mail->send();
    http_response_code(200);
    echo json_encode(["message" => "Email sent successfully!"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Email could not be sent. Error: {$mail->ErrorInfo}"]);
}
?>
