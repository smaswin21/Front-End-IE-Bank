<template>
  <div class="user-create">
    <h2>Create User</h2>
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
      <b-form-group label="Admin:" label-for="admin">
        <b-form-checkbox id="admin" v-model="isAdmin">Make Admin</b-form-checkbox>
      </b-form-group>
      <b-button type="submit" variant="primary">Create User</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      isAdmin: false,
    };
  },
  methods: {
    createUser() {
      // Call API to create user
    },
  },
};
</script>

<style scoped>
.user-create {
  padding: 40px;
}
</style>