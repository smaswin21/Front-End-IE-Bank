<template>
  <div class="homepage">
    <!-- Top Header -->
    <header class="header">
      <div class="logo">
        <h2>IE Bank</h2>
      </div>
      <nav class="nav">
        <template v-if="isLoggedIn">
          <span class="nav-link">{{ username }}</span>
          <button @click="logout" class="btn btn-danger">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/register" class="nav-link">Register</router-link>
        </template>
      </nav>
    </header>

    <!-- Hero Section -->
    <div class="hero">
      <div class="hero-content">
        <h1>Welcome to IE Bank</h1>
        <p>Your trusted partner for secure and efficient banking solutions.</p>
        <div class="buttons">
          <router-link to="/login" class="btn btn-primary">Login</router-link>
          <router-link to="/register" class="btn btn-secondary">Register</router-link>
        </div>
      </div>
      <div class="hero-image">
        <img src="../assets/colleagues_office.png" alt="Colleagues in Office" />
      </div>
    </div>

    <!-- Combined Section -->
    <section class="combined-section">
      <div class="dashboard-content">
        <h2>Manage Your Accounts</h2>
        <p>Access your account details, view transaction history, and manage your finances with ease.</p>
        <router-link to="/dashboard" class="btn btn-primary">Go to Dashboard</router-link>
      </div>
      <div class="transfer-content">
        <h2>Seamless Money Transfers</h2>
        <p>Send money to anyone, anytime, with ease. Our secure platform ensures that your transactions are safe and hassle-free.</p>
        <router-link to="/transfer" class="btn btn-primary">Transfer Money</router-link>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="feature">
        <h3>Advanced Security</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div class="feature">
        <h3>24/7 Customer Support</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div class="feature">
        <h3>Seamless Transfers</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <h2>About IE Bank</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo lorem id metus hendrerit, non facilisis purus aliquet.
        Proin eget justo sit amet lectus fermentum faucibus at sed eros.
      </p>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024 IE Bank. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      showCookiePopup: false, // Updated default state
      username: "", // Stores username when logged in
      isLoggedIn: false, // Tracks if user is logged in
    };
  },
  methods: {
    async fetchUserStatus() {
      try {
        console.log("Fetching user status...");
        const response = await fetch(`${process.env.VUE_APP_ROOT_URL}/dashboard`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User status fetched successfully:", data);
          this.isLoggedIn = true; // User is logged in
          this.username = data.username; // Fetch username from response
        } else {
          console.log("User not logged in or session expired.");
          this.isLoggedIn = false; // User is not logged in
          this.username = "";
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
        this.isLoggedIn = false;
        this.username = "";
      }
    },
    async logout() {
      try {
        await axios.get(`${process.env.VUE_APP_ROOT_URL}/logout`, {
          withCredentials: true,
        });
        alert("You have been logged out.");
        window.location.reload(); // Reload the page to reflect the logout
      } catch (error) {
        console.error("Logout failed:", error);
        alert("An error occurred while logging out. Please try again.");
      }
    },
    acceptCookies() {
      this.showCookiePopup = false;
      // Save the cookie acceptance in localStorage
      localStorage.setItem("cookiesAccepted", "true");
    },
    checkCookiePopup() {
      // Check localStorage for cookie acceptance
      const cookiesAccepted = localStorage.getItem("cookiesAccepted");
      if (!cookiesAccepted) {
        this.showCookiePopup = true;
      }
    },
  },
  created() {
    this.fetchUserStatus(); // Fetch login status on component creation
    this.checkCookiePopup(); // Check if the cookie popup should be shown
  },
};
</script>

<style scoped>
/* General Reset */
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background-color: #f9f9f9;
  color: #333;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #004080;
  color: white;
}

.logo h2 {
  margin: 0;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}

/* Hero Section */
.hero {
  display: flex;
  align-items: center;
  padding: 40px;
  background-color: #fff;
}

.hero-content {
  flex: 1;
  padding-right: 20px;
}

.hero h1 {
  font-size: 2.5rem;
  color: #004080;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.hero-image {
  text-align: center; 
  padding: 20px;
}

.hero-image img {
  max-width: 100%;
  max-height: 450px;
  display: block;
  margin: 0 auto; 
}


/* Buttons */
.buttons .btn {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
}

.btn-primary {
  background-color: #004080;
  color: white;
}

.btn-secondary {
  background-color: #fff;
  color: #004080;
  border: 2px solid #004080;
}

/* Features Section */
.features {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 80px 60px;
}

.feature h3 {
  color: #004080;
  margin-bottom: 10px;
}

/* About Section */
.about {
  padding: 40px;
  text-align: center;
}

.about h2 {
  font-size: 2rem;
  color: #004080;
}

.about p {
  padding-left: 300px;
  padding-right: 300px;
  margin-bottom: 20px;
}

/* Footer */
.footer {
  text-align: center;
  padding: 20px;
  background-color: #004080;
  color: white;
}

/* Cookie Popup */
.cookie-popup {
  position: fixed;
  bottom: 30px;
  left: 400px;
  background: #fff;
  padding: 40px;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.cookie-popup p {
  margin: 0 0 10px 0;
}

.cookie-link {
  color: #004080;
  text-decoration: underline;
}

/* Combined Section */
.combined-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f8f9fa;
  padding: 40px;
  margin: 40px auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dashboard-content,
.transfer-content {
  flex: 1;
  margin: 0 20px;
  text-align: center;
}

.dashboard-content h2,
.transfer-content h2 {
  font-size: 1.8rem;
  color: #004080;
}

.dashboard-content p,
.transfer-content p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #004080;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #003366;
}
</style>