<template>
  <div class="admin-portal-page">
    <div class="form-container">
      <h2>Admin Portal</h2>
      <p>Manage users and accounts from here.</p>
      <div class="admin-links">
        <b-button
          @click="handleAction('manage_users')"
          variant="primary"
          block
          class="admin-button"
        >
          Manage Users
        </b-button>
        <b-button
          @click="logout"
          variant="outline-danger"
          block
          class="admin-button"
        >
          Logout
        </b-button>
        <b-button
          @click="goBack"
          variant="outline-secondary"
          block
          class="admin-button"
        >
          Back
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminPortal",
  methods: {
    async handleAction(action) {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_ROOT_URL}/admin`,
          { action },
          { withCredentials: true }
        );
        this.$router.push(response.data.redirect);
      } catch (error) {
        console.error("Action failed:", error);
        alert("An error occurred while processing your request.");
      }
    },
    async logout() {
      try {
        await axios.get(`${process.env.VUE_APP_ROOT_URL}/logout`, {
          withCredentials: true,
        });
        alert("You have been logged out.");
        this.$router.push("/");
      } catch (error) {
        console.error("Logout failed:", error);
        alert("An error occurred while logging out. Please try again.");
      }
    },
    goBack() {
      this.$router.go(-1); // Navigate back to the previous page
    },
  },
};
</script>

<style scoped>
.admin-portal-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa; /* Consistent background */
}

.form-container {
  width: 100%;
  max-width: 400px;
  padding: 20px 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

p {
  margin-bottom: 20px;
  font-size: 16px;
  color: #6c757d;
}

.admin-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.admin-button {
  font-size: 16px;
  padding: 10px 20px;
}
</style>