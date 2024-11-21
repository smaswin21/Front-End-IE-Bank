<template>
  <div class="dashboard">
    <div class="welcome">
      <h1>Welcome, {{ username }}</h1>
    </div>

    <div v-if="!isAdmin">
      <div class="accounts-section">
        <h2>Your Accounts</h2>
        <ul v-if="accounts.length">
          <li v-for="account in accounts" :key="account.id">
            <strong>{{ account.name }}</strong> - {{ account.account_number }} |
            Balance: {{ account.balance }} {{ account.currency }}
          </li>
        </ul>
        <p v-else>No accounts available.</p>
        <!-- Button to show create account form -->
        <button class="btn btn-primary" @click="showCreateForm = !showCreateForm">
          {{ showCreateForm ? 'Close' : 'Create New Account' }}
        </button>

        <!-- Create Account Form -->
        <div v-if="showCreateForm" class="create-account-form">
          <h3>Create New Account</h3>
          <b-form @submit.prevent="createAccount">
            <b-form-group label="Account Name:" label-for="account-name">
              <b-form-input
                id="account-name"
                v-model="newAccount.name"
                placeholder="Enter account name"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Currency:" label-for="currency">
              <b-form-input
                id="currency"
                v-model="newAccount.currency"
                placeholder="Enter currency (e.g., EUR)"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Country:" label-for="country">
              <b-form-input
                id="country"
                v-model="newAccount.country"
                placeholder="Enter country"
                required
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="success">Create Account</b-button>
          </b-form>
        </div>
      </div>

      <div class="transactions-section">
        <h2>Your Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>From Account</th>
              <th>To Account</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="transactions.length === 0">
              <td colspan="6">No transactions found.</td>
            </tr>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.created_at }}</td>
              <td>{{ transaction.transaction_type }}</td>
              <td>{{ transaction.account_id }}</td>
              <td>{{ transaction.sent_account_id }}</td>
              <td>{{ transaction.amount }} {{ transaction.currency }}</td>
              <td>{{ transaction.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="actions">
        <router-link to="/transfer" class="action-link">Transfer Money</router-link>
        <button @click="logout" class="action-link">Logout</button>
        <button @click="goBack" class="action-link">Back</button>
      </div>
    </div>

    <div v-else>
      <p>You are an admin. Use the admin portal to manage users and accounts.</p>
      <router-link to="/admin" class="action-link">Go to Admin Portal</router-link>
      <button @click="logout" class="action-link">Logout</button>
      <button @click="goBack" class="action-link">Back</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      username: "",
      isAdmin: false,
      accounts: [],
      transactions: [],
      showCreateForm: false, // Toggles the account creation form
      newAccount: {
        name: "",
        currency: "",
        country: "",
      },
      error: null,
    };
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_ROOT_URL}/dashboard`,
          { withCredentials: true }
        );

        this.username = response.data.username;
        this.isAdmin = response.data.is_admin;
        this.accounts = response.data.accounts;
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        this.error = "An error occurred while loading the dashboard.";
      }
    },
    async fetchTransactions() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_ROOT_URL}/transactions`,
          { withCredentials: true }
        );
        this.transactions = response.data.transactions;
      } catch (error) {
        console.error("Error fetching transactions:", error);
        this.error = "An error occurred while loading transactions.";
      }
    },
    async createAccount() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_ROOT_URL}/create_account`,
          this.newAccount,
          { withCredentials: true }
        );
        alert(response.data.message);
        this.newAccount = { name: "", currency: "", country: "" };
        this.showCreateForm = false;
        this.fetchDashboardData(); // Refresh accounts
      } catch (error) {
        console.error("Error creating account:", error);
        alert(error.response?.data?.error || "Failed to create account.");
      }
    },
    async logout() {
      try {
        await axios.get(`${process.env.VUE_APP_ROOT_URL}/logout`, {
          withCredentials: true,
        });
        alert("You have been logged out.");
        this.$router.push("/");
      } catch (error) {
        console.error("Logout failed:", error);
        alert("An error occurred while logging out. Please try again.");
      }
    },
    goBack() {
      if (this.isAdmin) {
        this.$router.push("/admin");
      } else {
        this.$router.push("/");
      }
    },
  },
  created() {
    this.fetchDashboardData();
    this.fetchTransactions(); // Fetch transactions separately
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.welcome h1 {
  text-align: center;
  color: #343a40;
  margin-bottom: 30px;
}

.accounts-section,
.transactions-section {
  margin-bottom: 30px;
}

.accounts-section ul {
  list-style: none;
  padding: 0;
}

.accounts-section li {
  background: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.transactions-section table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.transactions-section th,
.transactions-section td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.transactions-section th {
  background: #343a40;
  color: white;
}

.transactions-section td {
  background: #ffffff;
}

.actions {
  text-align: center;
  margin-top: 20px;
}

.action-link {
  margin: 0 10px;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
}

.action-link:hover {
  background: #0056b3;
}
</style>