<template>
  <v-container fluid>
    
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Taxes
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <tax />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Family
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <family />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Units
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <unit />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Company
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <company />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          User
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <user />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    
  </v-container>
</template>

<script>
  import Tax from '../components/Tax.vue'
  import Family from '../components/Family.vue'
  import Unit from '../components/Unit.vue'
  import Company from '../components/Company.vue'
  import User from '../components/User.vue'

  export default {
    components: {
            Tax,
            Family,
            Unit,
            Company,
            User
        },
  }
</script>

<style scoped>

  ::v-deep .v-icon__svg {
    color: #ffffff !important;
  }
  .v-expansion-panel {
    background-color: #00366f !important;
    color: white !important;
  }
</style>
