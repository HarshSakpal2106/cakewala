<?php

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;


if ($method === 'GET') {
    $user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : null;

    if ($user_id) {
        $stmt = $conn->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->bind_param('i', $user_id);
    } else {
        $stmt = $conn->prepare("SELECT * FROM orders ORDER BY created_at DESC");
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    exit();
}


if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $customer_name  = trim($data['customer_name']  ?? '');
    $customer_email = trim($data['customer_email'] ?? '');
    $contact        = trim($data['contact']        ?? '');
    $address        = trim($data['address']        ?? '');
    $city           = trim($data['city']           ?? '');
    $pincode        = trim($data['pincode']        ?? '');
    $cake_id        = !empty($data['cake_id'])  ? (int)$data['cake_id']  : null;
    $cake_name      = trim($data['cake_name']       ?? '');
    $quantity       = (int)($data['quantity']       ?? 1);
    $total_price    = (int)($data['total_price']    ?? 0);
    $payment_method = trim($data['payment_method']  ?? 'Cash');

    $user_id        = !empty($data['user_id'])   ? (int)$data['user_id']   : null;

    if (!$customer_name || !$contact || !$address || !$cake_name || !$total_price) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields.']);
        exit();
    }

    $order_ref = '#CW' . rand(1000, 9999);

    $stmt = $conn->prepare(
        "INSERT INTO orders
         (order_ref, customer_name, customer_email, contact, address, city, pincode,
          cake_id, cake_name, quantity, total_price, payment_method, user_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param(
        'sssssssisiisi',
        $order_ref, $customer_name, $customer_email, $contact,
        $address, $city, $pincode,
        $cake_id, $cake_name, $quantity, $total_price, $payment_method, $user_id
    );
    $stmt->execute();

    $new_id = $conn->insert_id;
    $row    = $conn->query("SELECT * FROM orders WHERE id = $new_id")->fetch_assoc();
    http_response_code(201);
    echo json_encode($row);
    exit();
}


if ($method === 'PATCH' && $id) {
    $data   = json_decode(file_get_contents('php://input'), true);
    $status = trim($data['status'] ?? '');

    $allowed = ['Pending', 'Out for Delivery', 'Done', 'Cancelled'];
    if (!in_array($status, $allowed)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid status.']);
        exit();
    }

    $stmt = $conn->prepare("UPDATE orders SET status = ? WHERE id = ?");
    $stmt->bind_param('si', $status, $id);
    $stmt->execute();

    $row = $conn->query("SELECT * FROM orders WHERE id = $id")->fetch_assoc();
    echo json_encode($row);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
