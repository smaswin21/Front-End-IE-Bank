<!-- Home Page -->
<template>
  <div class="home-page">
    <!-- Home, Accounts, and Skull -->
    <header class="header">
      <nav class="navigation">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/accounts" class="nav-item">Accounts</router-link>
        <router-link to="/skull" class="nav-item">Skull</router-link>
      </nav>
    </header>

    <!-- Welcome -->
    <section class="welcome-section">
      <h1 class="main-title">IE Home</h1>
      <h2 class="sub-title">Welcome to the IE Bank Corporation</h2>
      <img src="../assets/logo.png" alt="IE Bank Logo" class="bank-logo" />
      <p class="intro-text">
        We are here to help you manage your accounts and finances efficiently.
      </p>
    </section>

    <!-- Action Section-->
    <section class="cta-section">
      <button @click="goToAccounts" class="btn btn-primary">View Accounts</button>
      <router-link to="/create-account">
        <button class="btn btn-secondary">Create New Account</button>
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    goToAccounts() {
      this.$router.push('/accounts');
    }
  }
}
</script>

<!-- Scoped CSS for the Home Page -->
<style scoped>
.home-page {
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.header {
  background-color: #283593;
  padding: 20px;
}

.navigation {
  display: flex;
  justify-content: center;
}

.nav-item {
  padding: 15px;
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.nav-item:hover {
  background-color: #5c6bc0;
  color: white;
}

.welcome-section {
  margin-top: 50px;
}

.main-title {
  font-size: 48px;
  margin-bottom: 10px;
  color: #283593;
}

.sub-title {
  font-size: 28px;
  color: #5c6bc0;
}

.bank-logo {
  margin: 30px auto;
  display: block;
  width: 350px;
  height: auto;
}

.intro-text {
  font-size: 18px;
  margin: 20px auto;
  max-width: 600px;
}

.cta-section {
  margin-top: 40px;
}

.btn {
  font-size: 18px;
  padding: 10px 20px;
  margin: 10px;
}
</style>
