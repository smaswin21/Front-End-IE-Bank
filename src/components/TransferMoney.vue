<template>
  <div class="transfer-money">
    <h2>Transfer Money</h2>
    <b-alert v-if="showMessage" variant="success" show>{{ message }}</b-alert>
    <b-form @submit.prevent="onTransfer">
      <b-form-group label="From Account:" label-for="from-account">
        <b-form-select
          id="from-account"
          v-model="fromAccountId"
          :options="accounts"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group label="To Account Number:" label-for="to-account">
        <b-form-input
          id="to-account"
          v-model="toAccountNumber"
          placeholder="Enter destination account number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Amount:" label-for="amount">
        <b-form-input
          id="amount"
          type="number"
          v-model="amount"
          placeholder="Enter amount"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" block>Transfer</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TransferMoney",
  data() {
    return {
      fromAccountId: "",
      toAccountNumber: "",
      amount: "",
      accounts: [],
      showMessage: false,
      message: "",
    };
  },
  methods: {
    onTransfer() {
      // Call the transfer API
    },
    getAccounts() {
      // Fetch user accounts
    },
  },
  created() {
    this.getAccounts();
  },
};
</script>

<style scoped>
.transfer-money {
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>