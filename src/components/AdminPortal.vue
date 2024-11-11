<template>
  <div class="admin-portal">
    <h2>Admin Dashboard</h2>
    <p>Manage users and accounts from here.</p>
    <div class="admin-links">
      <router-link to="/admin/users" class="btn btn-outline-primary">
        Manage Users
      </router-link>
      <router-link to="/admin/accounts" class="btn btn-outline-secondary">
        Manage Accounts
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPortal",
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
</style> 