function toggleForm() {
  const container = document.querySelector(".container");
  container.classList.toggle("active");
}
// ----------------------
// BACKEND-INTEGRATION
// ----------------------
// LOGIN
// document
//   .getElementById("loginForm")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault();
//     const username = document.getElementById("loginUsername").value;
//     const password = document.getElementById("loginPassword").value;

//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         alert("Login successful!");
//         // Redirect or handle successful login
//       } else {
//         alert(`Error: ${result.message}`);
//       }
//     } catch (error) {
//       alert("An error occurred. Please try again.");
//     }
//   });

// // REGISTRATION
// document
//   .getElementById("registerForm")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault();
//     const username = document.getElementById("registerUsername").value;
//     const email = document.getElementById("registerEmail").value;
//     const password = document.getElementById("registerPassword").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;

//     if (password !== confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, email, password }),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         alert("Registration successful!");
//         // Redirect or handle successful registration
//       } else {
//         alert(`Error: ${result.message}`);
//       }
//     } catch (error) {
//       alert("An error occurred. Please try again.");
//     }
//   });
