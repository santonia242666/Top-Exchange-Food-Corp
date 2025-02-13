document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    if (!user) {
        alert("Access denied! Please log in first.");
        window.location.href = "index.html";
    }

    // Logout Function
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("user");
        alert("Logged out successfully!");
        window.location.href = "index.html";
    });

    // Sidebar Navigation Logic
    const navButtons = document.querySelectorAll(".nav-btn");
    const sectionTitle = document.getElementById("section-title");
    const sectionContent = document.getElementById("section-content");
    const inputPoBtn = document.getElementById("input-po-btn");

    const sections = {
        dashboard: "Welcome to your dashboard overview.",
        sales: "Here is your sales data overview.",
        forecast: "Forecasting insights and analytics.",
    };

    navButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            navButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const section = btn.getAttribute("data-section");
            sectionTitle.textContent = btn.textContent;
            sectionContent.textContent = sections[section];

            // Show P.O Button only on Dashboard
            inputPoBtn.style.display = section === "dashboard" ? "block" : "none";
        });
    });

    // P.O Modal Logic
    const poModal = document.getElementById("po-modal");
    const poForm = document.getElementById("po-form");
    const closeBtn = document.querySelector(".close");

    inputPoBtn.addEventListener("click", () => {
        poModal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        poModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === poModal) {
            poModal.style.display = "none";
        }
    });

    // Handle P.O Form Submission
    poForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const poNumber = document.getElementById("po-number").value.trim();
        const poDate = document.getElementById("po-date").value;
        const poAmount = document.getElementById("po-amount").value;

        if (!poNumber || !poDate || !poAmount) {
            alert("Please fill in all fields.");
            return;
        }

        alert(`P.O Submitted!\nNumber: ${poNumber}\nDate: ${poDate}\nAmount: $${poAmount}`);
        poForm.reset();
        poModal.style.display = "none";
    });

    // Fetch and Display P.O Data
    function fetchPOData() {
        fetch("get_po.php") // Request data from PHP backend
            .then(response => response.json()) // Convert the response to JSON
            .then(data => {
                if (data.success) {
                    const tableBody = document.getElementById("po-table-body");
                    tableBody.innerHTML = ""; // Clear existing rows

                    // Loop through each P.O record and add it as a row in the table
                    data.data.forEach(po => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${po.po_number}</td>
                            <td>${po.po_date}</td>
                            <td>$${po.po_amount}</td>
                        `;
                        tableBody.appendChild(row);
                    });
                } else {
                    console.error("Failed to load P.O data.");
                }
            })
            .catch(error => console.error("Error fetching P.O data:", error));
    }

    // Call fetchPOData when the page loads
    fetchPOData();
});
