<template>
  <div class="login-page">
    <div class="form-container">
      <h2>Login</h2>
      <b-alert v-if="error" variant="danger" show>{{ error }}</b-alert>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Username:" label-for="username">
          <b-form-input
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="password">
          <b-form-input
            id="password"
            type="password"
            v-model="password"
            placeholder="Enter your password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" block>Login</b-button>
      </b-form>
      <b-button @click="goBack" variant="link" class="back-button">Back</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_ROOT_URL}/login`,
          {
            username: this.username,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // Redirect based on server response
        if (response.data.redirect === "admin") {
          this.$router.push("/admin");
        } else if (response.data.redirect === "dashboard") {
          this.$router.push("/");
        } else {
          this.error = "Unexpected response from the server.";
        }
      } catch (error) {
        console.error("Login Error:", error);
        this.error =
          error.response?.data?.error || "Unexpected response from the server. Please try again.";
      }
    },
    goBack() {
      this.$router.push('/'); // Navigate back to the previous page
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
}

.form-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.back-button {
  display: block;
  margin: 10px auto 0;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.back-button:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>