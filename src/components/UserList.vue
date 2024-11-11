<template>
  <div class="user-list">
    <h2>User Management</h2>
    <router-link to="/admin/users/create" class="btn btn-primary mb-3">
      Create User
    </router-link>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.admin ? 'Yes' : 'No' }}</td>
          <td>
            <router-link :to="`/admin/users/${user.id}/edit`" class="btn btn-info btn-sm">Edit</router-link>
            <router-link :to="`/admin/users/${user.id}/delete`" class="btn btn-danger btn-sm">Delete</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [], // Load users from API
    };
  },
  created() {
    // Fetch users
  },
};
</script>

<style scoped>
.user-list {
  padding: 40px;
}
</style>
