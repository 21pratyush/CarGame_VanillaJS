// const API_BASE_URL = 'http://localhost:3000';

// async function request(endpoint, method, data) {
//   const options = {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include', // Include cookies for cross-origin requests
//   };

//   if (data) {
//     options.body = JSON.stringify(data);
//   }

//   const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

//   if (!response.ok && response.status === 401) {
//     // Attempt to refresh token if 401 Unauthorized
//     const refreshed = await refreshAccessToken();
//     if (refreshed) return request(endpoint, method, data);
//   }

//   const result = await response.json();
//   if (!response.ok) {
//     throw new Error(result.message || 'Something went wrong');
//   }
//   return result;
// }

// async function refreshAccessToken() {
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
//         method: 'POST',
//         credentials: 'include',
//       });
//       if (response.ok) return true;
//     } catch {
//       return false;
//     }
//   }


// // API functions
// export async function register(userData) {
//   return request('/welcome/register', 'POST', userData);
// }

// export async function login(userData) {
//   return request('/welcome/login', 'POST', userData);
// }

// export async function logout() {
//   return request('/welcome/logout', 'POST');
// }


// REGISTRATION
async function registerUser(userData) {
    try {
        const response = await fetch('http://localhost:3000/welcome/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const result = await response.json();
        console.log('Registration successful:', result);
    } catch (error) {
        console.error('Error during registration:', error);
    }
}
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const userData = {
        userName: username,
        email: email,
        password: password
    };

    registerUser(userData);
});


// //LOGIN
async function loginUser(credentials) {
    try {
        const response = await fetch('http://localhost:3000/welcome/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const result = await response.json();
        // console.log(credentials.userName);
        localStorage.setItem('userName', credentials.userName);
        console.log('Login successful:', result);
        localStorage.setItem('isLoggedIn', true);
        window.location.href = '/';

    } catch (error) {
        console.error('Error during login:', error);
    }
}
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userName = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    await loginUser({ userName, password });

});








//TODO -> front-end is not connected to backend for the score feature 