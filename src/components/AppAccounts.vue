<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Accounts</h1>
          <hr />
          <br />
          <!-- Success Message -->
          <b-alert v-if="showMessage" variant="success" show>{{ message }}</b-alert>

          <!-- Button to create a new account -->
          <button
            type="button"
            class="btn btn-success btn-sm"
            v-b-modal.account-modal
          >
            Create Account
          </button>
          <br /><br />

          <!-- Accounts Table -->
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Account Name</th>
                <th scope="col">Account Number</th>
                <th scope="col">Balance</th>
                <th scope="col">Currency</th>
                <th scope="col">Country</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account in accounts" :key="account.id">
                <td>{{ account.name }}</td>
                <td>{{ account.account_number }}</td>
                <td>{{ account.balance }}</td>
                <td>{{ account.currency }}</td>
                <td>{{ account.country }}</td>
                <td>
                  <span
                    v-if="account.status == 'Active'"
                    class="badge badge-success"
                    >{{ account.status }}</span
                  >
                  <span v-else class="badge badge-danger">{{ account.status }}</span>
                </td>
                <td>
                  <div class="btn-group" role="group">
                    <!-- Edit Button -->
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      v-b-modal.edit-account-modal
                      @click="editAccount(account)"
                    >
                      Edit
                    </button>
                    <!-- Delete Button -->
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="deleteAccount(account)"
                    >
                      Delete
                    </button>
                    <!-- Transfer Money Button -->
                    <router-link
                      :to="{ name: 'TransferMoney', params: { accountId: account.id } }"
                      class="btn btn-warning btn-sm"
                    >
                      Transfer Money
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Footer -->
          <footer class="text-center">
            Copyright &copy; All Rights Reserved.
          </footer>
        </div>
      </div>

      <!-- Modal for Creating Account -->
      <b-modal
        ref="addAccountModal"
        id="account-modal"
        title="Create a new account"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmit" class="w-100">
          <b-form-group label="Account Name:" label-for="form-name-input">
            <b-form-input
              id="form-name-input"
              type="text"
              v-model="createAccountForm.name"
              placeholder="Account Name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Currency:" label-for="form-currency-input">
            <b-form-input
              id="form-currency-input"
              type="text"
              v-model="createAccountForm.currency"
              placeholder="$ or €"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Country:" label-for="form-country-input">
            <b-form-input
              id="form-country-input"
              type="text"
              v-model="createAccountForm.country"
              placeholder="Spain"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>

      <!-- Modal for Editing Account -->
      <b-modal
        ref="editAccountModal"
        id="edit-account-modal"
        title="Edit the account"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitUpdate" class="w-100">
          <b-form-group label="Account Name:" label-for="form-edit-name-input">
            <b-form-input
              id="form-edit-name-input"
              type="text"
              v-model="editAccountForm.name"
              placeholder="Account Name"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Update</b-button>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppAccounts",
  data() {
    return {
      accounts: [],
      createAccountForm: {
        name: "",
        currency: "",
        country: "",
      },
      editAccountForm: {
        id: "",
        name: "",
      },
      showMessage: false,
      message: "",
    };
  },
  methods: {
    RESTgetAccounts() {
      axios
        .get(`${process.env.VUE_APP_ROOT_URL}/accounts`)
        .then((response) => {
          this.accounts = response.data.accounts;
        })
        .catch((error) => console.error(error));
    },
    RESTcreateAccount(payload) {
      axios
        .post(`${process.env.VUE_APP_ROOT_URL}/accounts`, payload)
        .then(() => {
          this.RESTgetAccounts();
          this.showMessage = true;
          this.message = "Account created successfully!";
          setTimeout(() => (this.showMessage = false), 3000);
        })
        .catch((error) => console.error(error));
    },
    RESTupdateAccount(payload, accountId) {
      axios
        .put(`${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`, payload)
        .then(() => {
          this.RESTgetAccounts();
          this.showMessage = true;
          this.message = "Account updated successfully!";
          setTimeout(() => (this.showMessage = false), 3000);
        })
        .catch((error) => console.error(error));
    },
    RESTdeleteAccount(accountId) {
      axios
        .delete(`${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`)
        .then(() => {
          this.RESTgetAccounts();
          this.showMessage = true;
          this.message = "Account deleted successfully!";
          setTimeout(() => (this.showMessage = false), 3000);
        })
        .catch((error) => console.error(error));
    },
    initForm() {
      this.createAccountForm.name = "";
      this.createAccountForm.currency = "";
      this.createAccountForm.country = "";
      this.editAccountForm.id = "";
      this.editAccountForm.name = "";
    },
    onSubmit(e) {
      e.preventDefault();
      this.$refs.addAccountModal.hide();
      const payload = { ...this.createAccountForm };
      this.RESTcreateAccount(payload);
      this.initForm();
    },
    onSubmitUpdate(e) {
      e.preventDefault();
      this.$refs.editAccountModal.hide();
      const payload = { name: this.editAccountForm.name };
      this.RESTupdateAccount(payload, this.editAccountForm.id);
      this.initForm();
    },
    editAccount(account) {
      this.editAccountForm = { ...account };
    },
    deleteAccount(account) {
      this.RESTdeleteAccount(account.id);
    },
  },
  created() {
    this.RESTgetAccounts();
  },
};
</script>

<style scoped>
.jumbotron {
  padding: 2rem 1rem;
}
.btn {
  margin: 0 5px;
}
</style>
