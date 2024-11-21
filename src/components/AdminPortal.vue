<template>
  <div class="admin-portal">
    <h2>Admin Portal</h2>
    <p>Manage users and accounts from here.</p>
    <div class="admin-links">
      <button @click="handleAction('manage_users')" class="btn btn-outline-primary">
        Manage Users
      </button>
      <button @click="logout" class="action-link">Logout</button>
      <button @click="goBack" class="action-link">Back</button>
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
      },goBack() {
          this.$router.push("/");
      },async logout() {
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
      }
  },
};
</script>

<style scoped>
.admin-portal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: #f0f4f7;
  height: 100vh;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.admin-links {
  display: flex;
  gap: 20px;
}

form {
  margin: 0;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-outline-primary {
  background: #007bff;
  color: white;
}

.btn-outline-secondary {
  background: #6c757d;
  color: white;
}

button:hover {
  opacity: 0.9;
}
</style>