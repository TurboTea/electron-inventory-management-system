<template>
  <v-container>
    <stocks />
  </v-container>
</template>

<script>
  import Stocks from '../components/Stocks'

  export default {
    name: 'Stock',

    components: {
      Stocks,
    },
  }
</script>