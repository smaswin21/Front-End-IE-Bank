<template>
  <div class="user-list-page">
    <!-- Top Header -->
    <header class="header">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <h2>IE Bank</h2>
        </router-link>
      </div>
      <nav class="nav">
        <router-link to="/dashboard" class="nav-link">
          <span>{{ username }}</span>
        </router-link>
        <button @click="logout" class="btn btn-danger">Logout</button>
      </nav>
    </header>

    <!-- Main Content -->
    <div class="content-container">
      <div class="header">
        <h2>User Management</h2>
      </div>

      <!-- Create User Button -->
      <router-link to="/admin/users/create" class="btn btn-primary create-user-button">
        Create User
      </router-link>

      <!-- User Table -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Accounts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.admin ? 'Yes' : 'No' }}</td>
            <td>
              <ul>
                <li v-for="account in user.accounts" :key="account">{{ account }}</li>
              </ul>
            </td>
            <td>
              <router-link
                :to="`/admin/users/${user.id}/edit`"
                class="btn btn-info btn-sm action-btn"
              >
                Edit
              </router-link>
              <button
                @click="confirmDelete(user.id)"
                class="btn btn-danger btn-sm action-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Back Button -->
      <b-button @click="goBack" variant="link" class="back-button">Back</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      username: "Admin", // Placeholder for the username
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_ROOT_URL}/admin/users`, {
          withCredentials: true,
        });
        this.users = response.data.users;
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to load users.");
      }
    },
    async confirmDelete(userId) {
      if (!confirm("Are you sure you want to delete this user?")) {
        return;
      }
      this.deleteUser(userId);
    },
    async deleteUser(userId) {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_ROOT_URL}/admin/users/${userId}/delete`,
          {},
          { withCredentials: true }
        );
        alert(response.data.message || "User deleted successfully.");
        this.fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete the user. Please try again.");
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
      this.$router.go(-1);
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* General Page Styling */
.user-list-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Header Styling */
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

.logo-link {
  text-decoration: none;
  color: white;
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

/* Main Content */
.content-container {
  max-width: 1100px; /* Increased width for more space */
  margin: 40px auto;
  background: white;
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.content-container .header h2 {
  margin-bottom: 0px;
  font-size: 28px;
}

/* Buttons */
.create-user-button {
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 15px;
  color: white;
  background: #007bff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
}

.create-user-button:hover {
  background: #0056b3;
}

.back-button {
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
}

.back-button:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* Table Styling */
.table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.action-btn {
  margin-right: 5px;
}
</style>