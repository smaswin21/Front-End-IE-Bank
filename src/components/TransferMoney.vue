<template>
  <div class="transfer-page">
    <div class="form-container">
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
      <b-button @click="goBack" variant="link" class="back-button">Back</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
.transfer-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
}

.form-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.back-button {
  display: block;
  margin: 10px auto 0;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.back-button:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>