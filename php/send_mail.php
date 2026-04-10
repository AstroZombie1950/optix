<?php
/* Принимаем только POST */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	http_response_code(405);
	exit;
}

/* Собираем и чистим данные */
$name    = trim(strip_tags($_POST['name']    ?? ''));
$email   = trim(strip_tags($_POST['email']   ?? ''));
$source  = trim(strip_tags($_POST['source']  ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));

/* Базовая валидация */
if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
	http_response_code(400);
	echo json_encode(['success' => false, 'message' => 'Заполните все поля корректно.']);
	exit;
}

/* Тема в зависимости от источника */
$subjects = [
	'akkaunt-hh'        => 'Заявка на аккаунт HH',
	'udalit-otzyv-avito' => 'Заявка на удаление отзыва Авито',
];
$subjectText = $subjects[$source] ?? 'Новая заявка с сайта';

/* Тело письма */
$body  = "Новая заявка с сайта optixxx.ru\n";
$body .= "Страница: /$source\n\n";
$body .= "Имя:   $name\n";
$body .= "Почта: $email\n";

if ($message !== '') {
	$body .= "Сообщение:\n$message\n";
}

/* Параметры письма */
$to      = 'safronovvan@gmail.com';//<----------------------------------------------почта
$subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';

$headers  = "From: no-reply@optixxx.ru\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

/* Отправка */
$sent = mail($to, $subject, $body, $headers);

header('Content-Type: application/json; charset=utf-8');

if ($sent) {
	echo json_encode(['success' => true,  'message' => 'Заявка отправлена.']);
} else {
	http_response_code(500);
	echo json_encode(['success' => false, 'message' => 'Ошибка отправки. Попробуйте позже.']);
}