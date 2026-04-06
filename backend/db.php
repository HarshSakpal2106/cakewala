<?php

$conn = new mysqli('localhost', 'root', '', 'cakewala');

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(['error' => 'DB connection failed: ' . $conn->connect_error]));
}

$conn->set_charset('utf8mb4');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
