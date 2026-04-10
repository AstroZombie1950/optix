<?php
/* Принимаем только POST */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	http_response_code(405);
	exit;
}

/* Настройки бота — вставь свои */
$botToken = '8776087593:AAEvmr3ZmPEAFvyCZN0KQV8--EXypuyKRfM';//<--------------------------- api
$chatId   = '@test_channel_notifications';//<---------------------------------------------- channel

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

/* Заголовок в зависимости от источника */
$titles = [
	'akkaunt-hh'         => '🟡 Заявка на аккаунт HH',
	'udalit-otzyv-avito' => '🟡 Заявка на удаление отзыва Авито',
];
$title = $titles[$source] ?? '🟡 Новая заявка с сайта';

/* Текст сообщения */
$text  = "$title\n";
$text .= "━━━━━━━━━━━━━━━\n";
$text .= "👤 Имя: $name\n";
$text .= "📧 Почта: $email\n";
$text .= "🌐 Страница: optixxx.ru/$source\n";

if ($message !== '') {
	$text .= "💬 Сообщение: $message\n";
}

/* Отправка через Telegram Bot API */
$url  = "https://api.telegram.org/bot$botToken/sendMessage";
$data = [
	'chat_id'    => $chatId,
	'text'       => $text,
	'parse_mode' => 'HTML',
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST,           true);
curl_setopt($ch, CURLOPT_POSTFIELDS,     http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT,        10);
$response = curl_exec($ch);
$curlErr  = curl_error($ch);
curl_close($ch);

header('Content-Type: application/json; charset=utf-8');

/* Разбираем ответ Telegram */
$tgResult = json_decode($response, true);

if ($tgResult && $tgResult['ok'] === true) {
	echo json_encode(['success' => true, 'message' => 'Заявка отправлена.']);
} else {
	error_log('[send_mail.php] Telegram error: ' . $response . ' | curl: ' . $curlErr);
	http_response_code(500);
	echo json_encode(['success' => false, 'message' => 'Ошибка отправки. Попробуйте позже.']);
}