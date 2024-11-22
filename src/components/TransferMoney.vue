<template>
  <div class="transfer-money">
    <h2>Transfer Money</h2>
    <b-alert v-if="showMessage" variant="success" show>{{ message }}</b-alert>
    <b-alert v-if="errorMessage" variant="danger" show>{{ errorMessage }}</b-alert>
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
    <button @click="goBack" class="action-link">Back</button>
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
      errorMessage: "",
      message: "",
    };
  },
  methods: {
    async onTransfer() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_ROOT_URL}/transfer`,
          {
            from_account_id: this.fromAccountId,
            to_account_number: this.toAccountNumber,
            amount: parseFloat(this.amount),
          },
          { withCredentials: true }
        );
        this.message = response.data.message || "Transfer successful!";
        this.showMessage = true;
        this.errorMessage = "";
        this.fromAccountId = "";
        this.toAccountNumber = "";
        this.amount = "";
      } catch (error) {
        this.errorMessage =
          error.response?.data?.error || "An error occurred during the transfer.";
        this.showMessage = false;
      }
    },
    async getAccounts() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_ROOT_URL}/dashboard`, {
          withCredentials: true,
        });
        this.accounts = response.data.accounts.map((account) => ({
          value: account.id,
          text: `${account.name} - ${account.account_number}`,
        }));
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    },
    goBack() {
      this.$router.go(-1);
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