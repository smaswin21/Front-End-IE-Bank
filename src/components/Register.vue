<template>
  <div class="register-page">
    <div class="form-container">
      <h2>Register</h2>
      <b-alert v-if="error" variant="danger" show>{{ error }}</b-alert>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Username:" label-for="username">
          <b-form-input
            id="username"
            v-model="username"
            placeholder="Choose a username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Email:" label-for="email">
          <b-form-input
            id="email"
            type="email"
            v-model="email"
            placeholder="Enter your email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Initial Balance:" label-for="initial-balance">
          <b-form-input
            id="initial-balance"
            type="number"
            v-model="initialBalance"
            placeholder="Enter initial balance"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="password">
          <b-form-input
            id="password"
            type="password"
            v-model="password"
            placeholder="Create a password"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Confirm Password:" label-for="confirm-password">
          <b-form-input
            id="confirm-password"
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm your password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" block>Register</b-button>
      </b-form>
      <b-button to="/" variant="link" class="back-button">Back</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import appInsights from "../services/appInsights";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      initialBalance: 0.0,
      error: null,
    };
  },
  methods: {
    async onSubmit() {
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
        // Track registration failure event
        appInsights.trackEvent({
          name: "RegistrationFailed",
          properties: {
            username: this.username,
            reason: "Passwords do not match",
          },
        });
        return;
      }
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_ROOT_URL}/register`,
          {
            username: this.username,
            email: this.email,
            password: this.password,
            confirm_password: this.confirmPassword,
            initial_balance: this.initialBalance,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("Registration successful!");

        // Track successful registration event
        appInsights.trackEvent({
          name: "UserRegistered",
          properties: {
            username: this.username,
            email: this.email,
          },
        });

        this.$router.push("/");
      } catch (error) {
        this.error = error.response?.data?.error || "Registration failed. Please try again.";
        // Track registration failure event
        appInsights.trackEvent({
          name: "RegistrationFailed",
          properties: {
            username: this.username,
            reason: this.error,
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
}

.form-container {
  width: 100%;
  max-width: 450px;
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