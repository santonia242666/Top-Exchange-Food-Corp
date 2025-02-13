<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "purchase_orders");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

$sql = "SELECT * FROM purchase_orders"; 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $po_data = [];
    while ($row = $result->fetch_assoc()) {
        $po_data[] = $row;
    }
    echo json_encode(["success" => true, "data" => $po_data]);
} else {
    echo json_encode(["success" => true, "data" => []]);
}

$conn->close();
?>
