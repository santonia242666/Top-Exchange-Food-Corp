document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    if (!user) {
        alert("Access denied! Please log in first.");
        window.location.href = "index.html"; // Redirect back to login
    }

    // Handle Logout
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("user"); // Remove session
        alert("Logged out successfully!");
        window.location.href = "index.html"; // Redirect to login page
    });

    // Sidebar Navigation Logic
    const navButtons = document.querySelectorAll(".nav-btn");
    const sectionTitle = document.getElementById("section-title");
    const sectionContent = document.getElementById("section-content");

    const sections = {
        dashboard: "Welcome to your dashboard overview.",
        sales: "Here is your sales data overview.",
        forecast: "Forecasting insights and analytics.",
    };

    navButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons
            navButtons.forEach((b) => b.classList.remove("active"));

            // Set active button
            btn.classList.add("active");

            // Update content
            const section = btn.getAttribute("data-section");
            sectionTitle.textContent = btn.textContent;
            sectionContent.textContent = sections[section];
        });
    });
});
