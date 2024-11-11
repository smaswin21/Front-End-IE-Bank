<template>
    <div>
      <h2>Account Overview</h2>
      <div v-if="account">
        <p>Account Number: {{ account.number }}</p>
        <p>Balance: ${{ account.balance }}</p>
      </div>
  
      <h3>Transaction History</h3>
      <ul>
        <li v-for="transaction in transactions" :key="transaction.id">
          {{ transaction.date }} - {{ transaction.type }} - ${{ transaction.amount }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        account: null,
        transactions: [],
      };
    },
    async created() {
      try {
        const accountResponse = await axios.get('/api/account');
        this.account = accountResponse.data;
  
        const transactionsResponse = await axios.get('/api/transactions');
        this.transactions = transactionsResponse.data;
      } catch (error) {
        console.error("Failed to load account details", error);
      }
    },
  };
  </script>
  