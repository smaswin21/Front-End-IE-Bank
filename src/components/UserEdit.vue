<template>
  <div class="user-edit">
    <h2>Edit User</h2>
    <b-alert v-if="error" variant="danger" show>{{ error }}</b-alert>
    <b-alert v-if="success" variant="success" show>{{ success }}</b-alert>
    <b-form @submit.prevent="editUser">
      <b-form-group label="Username:" label-for="username">
        <b-form-input id="username" v-model="username" required></b-form-input>
      </b-form-group>
      <b-form-group label="Email:" label-for="email">
        <b-form-input id="email" type="email" v-model="email" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password (leave blank to keep current password):" label-for="password">
        <b-form-input id="password" type="password" v-model="password"></b-form-input>
      </b-form-group>
      <b-form-group label="Admin:" label-for="admin">
        <b-form-checkbox id="admin" v-model="isAdmin">Make Admin</b-form-checkbox>
      </b-form-group>
      <b-button type="submit" variant="primary">Save Changes</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      username: "",
      email: "",
      password: "",
      isAdmin: false,
      error: null,
      success: null,
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_ROOT_URL}/admin/users/${this.id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data && response.data.user) {
        const user = response.data.user;
        this.username = user.username;
        this.email = user.email;
        this.isAdmin = user.admin;
      } else {
        throw new Error("Invalid response structure.");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      this.error =
        error.response?.data?.error || "Failed to load user data. Please try again.";
    }
  },
  methods: {
    async editUser() {
      this.error = null;
      this.success = null;

      try {
        // Update user data
        await axios.put(
          `${process.env.VUE_APP_ROOT_URL}/admin/users/${this.id}/edit`,
          {
            username: this.username,
            email: this.email,
            password: this.password,
            confirm_password: this.password, // Match confirmation for simplicity
            admin: this.isAdmin,
          },
          { withCredentials: true }
        );

        // Show success message and redirect
        this.success = "User updated successfully!";
        setTimeout(() => this.$router.push("/admin/users"), 2000); // Redirect to user list
      } catch (error) {
        console.error("Error updating user:", error);
        this.error =
          error.response?.data?.error || "An error occurred while updating the user. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.user-edit {
  padding: 40px;
}
</style>