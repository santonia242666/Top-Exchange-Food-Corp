<?php
include 'db_connect.php';

// Check if data is received
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $po_number = $_POST['po_number'] ?? '';
    $po_date = $_POST['po_date'] ?? '';
    $po_amount = $_POST['po_amount'] ?? '';

    // Prepare and execute SQL statement
    $stmt = $conn->prepare("INSERT INTO purchase_orders (po_number, po_date, po_amount) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $po_number, $po_date, $po_amount);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Database error"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "error" => "Invalid request"]);
}
?>
