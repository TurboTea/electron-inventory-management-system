<template>
  <v-container>
    <products />
  </v-container>
</template>

<script>
  import Products from '../components/Products'

  export default {
    name: 'Product',

    components: {
      Products,
    },
  }
</script>