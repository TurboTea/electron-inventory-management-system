<template>
  <v-container>
    <customers />
  </v-container>
</template>

<script>
  import customers from '../components/Customers'

  export default {
    name: 'Customer',

    components: {
      customers,
    },
  }
</script>