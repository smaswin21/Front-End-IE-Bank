<template>
  <div class="user-delete">
    <h2>Delete User</h2>
    <p>Are you sure you want to delete this user?</p>
    <div class="buttons">
      <b-button @click="deleteUser" variant="danger">Yes, Delete</b-button>
      <router-link to="/admin/users" class="btn btn-secondary">Cancel</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    deleteUser() {
      // Call API to delete user
    },
  },
};
</script>

<style scoped>
.user-delete {
  text-align: center;
  padding: 40px;
}

.buttons {
  margin-top: 20px;
}
</style>