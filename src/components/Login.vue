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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    onSubmit() {
      // Perform login logic
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
</style>