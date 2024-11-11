<template>
  <div class="user-edit">
    <h2>Edit User</h2>
    <b-form @submit.prevent="editUser">
      <b-form-group label="Username:" label-for="username">
        <b-form-input id="username" v-model="username" required></b-form-input>
      </b-form-group>
      <b-form-group label="Email:" label-for="email">
        <b-form-input id="email" type="email" v-model="email" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
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
export default {
  props: ["id"],
  data() {
    return {
      username: "",
      email: "",
      password: "",
      isAdmin: false,
    };
  },
  created() {
    // Load user data by ID
  },
  methods: {
    editUser() {
      // Call API to edit user
    },
  },
};
</script>

<style scoped>
.user-edit {
  padding: 40px;
}
</style>