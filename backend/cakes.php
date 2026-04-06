<?php

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id'])     ? (int)$_GET['id'] : null;
$action = isset($_GET['action']) ? $_GET['action']   : null;


if ($method === 'GET') {
    if (isset($_GET['all'])) {
        $result = $conn->query("SELECT * FROM cakes ORDER BY id ASC");
    } else {
        $result = $conn->query("SELECT * FROM cakes WHERE available = 1 ORDER BY id ASC");
    }
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    exit();
}


if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name        = trim($data['name']        ?? '');
    $description = trim($data['description'] ?? '');
    $price       = (int)($data['price']      ?? 0);
    $tag         = trim($data['tag']         ?? '');
    $category    = trim($data['category']    ?? '');
    $image_url   = trim($data['image_url']   ?? '');

    if (!$name || !$description || !$price || !$category) {
        http_response_code(400);
        echo json_encode(['error' => 'name, description, price and category are required.']);
        exit();
    }

    $stmt = $conn->prepare(
        "INSERT INTO cakes (name, description, price, tag, category, image_url)
         VALUES (?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param('ssisss', $name, $description, $price, $tag, $category, $image_url);
    $stmt->execute();

    $new_id = $conn->insert_id;
    $row    = $conn->query("SELECT * FROM cakes WHERE id = $new_id")->fetch_assoc();
    http_response_code(201);
    echo json_encode($row);
    exit();
}


if ($method === 'PATCH' && $id) {

    if ($action === 'toggle') {
        $conn->query("UPDATE cakes SET available = NOT available WHERE id = $id");
        $row = $conn->query("SELECT * FROM cakes WHERE id = $id")->fetch_assoc();
        echo json_encode($row);
        exit();
    }

    $data      = json_decode(file_get_contents('php://input'), true);
    $image_url = trim($data['image_url'] ?? '');

    if ($image_url) {
        $stmt = $conn->prepare("UPDATE cakes SET image_url = ? WHERE id = ?");
        $stmt->bind_param('si', $image_url, $id);
        $stmt->execute();
    }

    $row = $conn->query("SELECT * FROM cakes WHERE id = $id")->fetch_assoc();
    echo json_encode($row);
    exit();
}


if ($method === 'DELETE' && $id) {
    $conn->query("DELETE FROM cakes WHERE id = $id");
    echo json_encode(['success' => true, 'id' => $id]);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
