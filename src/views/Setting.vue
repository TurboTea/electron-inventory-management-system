<template>
  <v-container fluid>
    <h1>Setting</h1>
    <tax />
    <family />
    <unit />
    <company />
  </v-container>
</template>

<script>
  import Tax from '../components/Tax.vue'
  import Family from '../components/Family.vue'
  import Unit from '../components/Unit.vue'
  import Company from '../components/Company.vue'

  export default {
    components: {
            Tax,
            Family,
            Unit,
            Company
        },
  }
</script>
