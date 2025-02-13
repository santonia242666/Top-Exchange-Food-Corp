document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevents actual form submission

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Simulating login (replace with real authentication later)
        localStorage.setItem("user", email); // Store user session
        alert("Login successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    });
});
