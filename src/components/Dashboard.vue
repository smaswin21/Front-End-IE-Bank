<template>
  <div class="dashboard">
    <!-- Top Header -->
    <header class="header">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <h2>IE Bank</h2>
        </router-link>
      </div>
      <nav class="nav">
        <template v-if="isLoggedIn">
          <router-link to="/dashboard" class="nav-link">
            <span>{{ username }}</span>
          </router-link>
          <button @click="logout" class="btn btn-danger">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/register" class="nav-link">Register</router-link>
        </template>
      </nav>
    </header>

    <div v-if="!isAdmin">
      <div class="accounts-section">
        <h2>Your Accounts</h2>
        <div class="accounts-wrapper">
          <!-- Accounts List -->
          <div class="accounts-list">
            <ul v-if="accounts.length">
              <li v-for="account in accounts" :key="account.id">
                <strong>{{ account.account_name }}</strong> {{ account.account_number }} |
                Balance: {{ account.balance }} {{ account.currency }}
              </li>
            </ul>
            <p v-else>No accounts available.</p>
          </div>

          <!-- Action Buttons -->
          <div class="accounts-actions">
            <button class="btn btn-primary" @click="showCreateForm = true">
              Create New Account
            </button>
            <router-link to="/transfer" class="btn btn-primary">Transfer Money</router-link>
          </div>
        </div>
      </div>

      <!-- Modal for Create Account -->
      <div v-if="showCreateForm" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <h3>Create a New Account</h3>
          <b-form @submit.prevent="createAccount">
            <b-form-group label="Account Name:" label-for="account-name">
              <b-form-input
                id="account-name"
                v-model="newAccount.account_name"
                placeholder="Enter account name"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Currency:" label-for="currency">
              <b-form-input
                id="currency"
                v-model="newAccount.currency"
                placeholder="Enter currency (e.g., EUR, USD)"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Initial Balance:" label-for="initial-balance">
              <b-form-input
                id="initial-balance"
                type="number"
                v-model="newAccount.initial_balance"
                placeholder="Enter initial balance"
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
            <div class="modal-actions">
              <b-button type="submit" variant="primary">Create Account</b-button>
              <b-button type="button" variant="secondary" @click="closeModal">
                Cancel
              </b-button>
            </div>
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
        <button @click="goBack" class="action-link">Back</button>
      </div>
    </div>
    <div v-else>
      <p style="padding:20px;">You are an admin. Use the admin portal to manage users and accounts.</p>
      <router-link to="/admin" class="action-link">Go to Admin Portal</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import appInsights from "../services/appInsights";

export default {
  name: "Dashboard",
  data() {
    return {
      username: "",
      isAdmin: false,
      isLoggedIn: false, // Added logic to toggle login/register
      accounts: [],
      transactions: [],
      showCreateForm: false, // Toggles the account creation form
      newAccount: {
        account_name: "",
        currency: "",
        country: "",
        initial_balance: 0.0,
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
        this.isLoggedIn = true;
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        this.error = "An error occurred while loading dashboard data.";
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
        this.newAccount = {
          account_name: "",
          currency: "",
          country: "",
          initial_balance: 0.0,
        };
        this.showCreateForm = false;
        this.fetchDashboardData();
      } catch (error) {
        console.error("Error creating account:", error);
        alert(error.response?.data?.error || "Failed to create account.");
      }
    },
    closeModal() {
      this.showCreateForm = false;
    },
    async logout() {
      try {
        await axios.get(`${process.env.VUE_APP_ROOT_URL}/logout`, {
          withCredentials: true,
        });
        alert("You have been logged out.");
        this.isLoggedIn = false; // Update login state
        this.username = ""; // Clear username
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
  background: #f8f9fa;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #004080;
  color: white;
}

.logo h2 {
  margin: 0;
}

.logo-link {
  text-decoration: none;
  color: white;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}

/* Accounts Section */
.accounts-section {
  padding: 20px 40px;
}

.accounts-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.accounts-list {
  flex: 3;
}

.accounts-actions {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 20px 30px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.modal-content h3 {
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}

/* Transactions Section */
.transactions-section {
  padding: 20px 40px;
  margin-bottom: 30px;
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

/* Actions */
.actions {
  text-align: center;
}
</style>
