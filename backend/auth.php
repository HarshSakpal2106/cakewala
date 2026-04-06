<?php

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if ($action === 'register') {
    $name     = trim($data['name']     ?? '');
    $email    = trim($data['email']    ?? '');
    $phone    = trim($data['phone']    ?? '');
    $password = trim($data['password'] ?? '');

    if (!$name || !$email || !$phone || !$password) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required.']);
        exit();
    }

    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param('s', $email);
    $check->execute();
    if ($check->get_result()->num_rows > 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Email already registered.']);
        exit();
    }

    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('ssss', $name, $email, $phone, $hashed);
    
    if ($stmt->execute()) {
        $user_id = $conn->insert_id;
        echo json_encode([
            'success' => true,
            'user' => [
                'id'    => $user_id,
                'name'  => $name,
                'email' => $email,
                'phone' => $phone
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Registration failed.']);
    }
    exit();
}

if ($action === 'login') {
    $email    = trim($data['email']    ?? '');
    $password = trim($data['password'] ?? '');

    if (!$email || !$password) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password are required.']);
        exit();
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode([
            'success' => true,
            'user' => [
                'id'    => $user['id'],
                'name'  => $user['name'],
                'email' => $user['email'],
                'phone' => $user['phone']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid email or password.']);
    }
    exit();
}

http_response_code(400);
echo json_encode(['error' => 'Invalid action.']);
