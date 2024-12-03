<template>
  <div class="user-create">
    <h2>Create User</h2>
    <b-alert v-if="error" variant="danger" show>{{ error }}</b-alert>
    <b-alert v-if="success" variant="success" show>{{ success }}</b-alert>
    <b-form @submit.prevent="createUser">
      <b-form-group label="Username:" label-for="username">
        <b-form-input id="username" v-model="username" required></b-form-input>
      </b-form-group>
      <b-form-group label="Email:" label-for="email">
        <b-form-input id="email" type="email" v-model="email" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" type="password" v-model="password" required></b-form-input>
      </b-form-group>
      <b-form-group label="Confirm Password:" label-for="confirm-password">
        <b-form-input id="confirm-password" type="password" v-model="confirmPassword" required></b-form-input>
      </b-form-group>
      <b-form-group label="Admin:" label-for="admin">
        <b-form-checkbox id="admin" v-model="isAdmin">Make Admin</b-form-checkbox>
      </b-form-group>
      <b-button type="submit" variant="primary">Create User</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
      error: null,
      success: null,
    };
  },
  methods: {
    async createUser() {
      this.error = null;
      this.success = null;

      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match!";
        return;
      }

      try {
        // Make POST request to backend
        await axios.post(
          `${process.env.VUE_APP_ROOT_URL}/admin/users/create`,
          {
            username: this.username,
            email: this.email,
            password: this.password,
            confirm_password: this.confirmPassword,
            admin: this.isAdmin,
          },
          {
            withCredentials: true,
          }
        );

        // Notify the user and redirect back to the user list
        this.success = "User created successfully!";
        setTimeout(() => this.$router.push("/admin/users"), 2000); // Redirect after showing success
      } catch (error) {
        console.error("Error creating user:", error);
        this.error =
          error.response?.data?.error || "An error occurred while creating the user. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.user-create {
  padding: 40px;
}
</style>