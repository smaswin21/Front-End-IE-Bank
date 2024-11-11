<template>
  <div class="homepage">
    <div class="content">
      <h1>Welcome to IE Bank</h1>
      <p>Your trusted banking partner</p>
      <div class="buttons">
        <router-link to="/login" class="btn btn-primary">Login</router-link>
        <router-link to="/register" class="btn btn-outline-primary">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.homepage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
  text-align: center;
}

.content h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}

.content p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
}

.buttons .btn {
  margin: 10px;
  padding: 10px 20px;
  font-size: 1rem;
}
</style>