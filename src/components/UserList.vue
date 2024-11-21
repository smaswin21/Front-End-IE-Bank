<template>
  <div class="user-list">
    <h2>User Management</h2>
    <!-- Button to navigate to the create user page -->
    <router-link to="/admin/users/create" class="btn btn-primary mb-3">
      Create User
    </router-link>
    <table class="table table-hover">
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
            <router-link :to="`/admin/users/${user.id}/edit`" class="btn btn-info btn-sm">Edit</router-link>
            <button @click="confirmDelete(user.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Back button -->
    <b-button @click="goBack" variant="link" class="back-button">Back</b-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [], // Users loaded from the backend
      error: null,
    };
  },
  methods: {
    // Fetch users from the backend
    async fetchUsers() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_ROOT_URL}/admin/users`, {
          withCredentials: true,
        });
        this.users = response.data.users; // Assuming the backend returns JSON with a "users" key
      } catch (error) {
        console.error("Error fetching users:", error);
        this.error = "Failed to load users.";
      }
    },
    // Confirm deletion with a dialog
    async confirmDelete(userId) {
      if (!confirm("Are you sure you want to delete this user?")) {
        return;
      }
      this.deleteUser(userId);
    },
    // Delete a user by ID
    async deleteUser(userId) {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_ROOT_URL}/admin/users/${userId}/delete`,
          {},
          { withCredentials: true }
        );
        alert(response.data.message || "User deleted successfully."); // Show the flash message from the backend
        this.fetchUsers(); // Refresh the user list after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete the user. Please try again.");
      }
    },
    // Go back to the admin portal
    goBack() {
      this.$router.push("/admin");
    },
  },
  created() {
    this.fetchUsers(); // Load users when the component is created
  },
};
</script>

<style scoped>
.user-list {
  padding: 40px;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.btn {
  margin-right: 5px;
}

.back-button {
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
}

.back-button:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>