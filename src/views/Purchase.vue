<template>
  <v-container>
    <purchases />
  </v-container>
</template>

<script>
  import Purchases from '../components/Purchases'

  export default {
    name: 'Purchase',

    components: {
      Purchases,
    },
  }
</script>