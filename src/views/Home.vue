<template>
  <v-container>
    <v-row>
      <v-col
        cols="4"
        v-for="item in items"
        :key="item.title"
      >     
        <v-card 
          hover
          class="card"
          :to="item.to"
          :disabled="item.title === 'Accueil'"
        >
          <v-img
            contain
            width="50%"
            class="center"
            :src="item.img"
          >
          </v-img>
          <v-card-title>{{ item.title }}</v-card-title>
        </v-card>    
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({ 
      items: [
          { title: 'Accueil', img: require('../assets/icons/home.png'), to: '/' },
          { title: 'Dashboard', img: require('../assets/icons/dashboard.png'), to: '/dashboard' },
          { title: 'Statistics', img: require('../assets/icons/statistics.png'), to: '/dashboard' },
          { title: 'Invoice', img: require('../assets/icons/file.png'), to: '/dashboard' },
          { title: 'Products', img: require('../assets/icons/packaging.png'), to: '/product' },
          { title: 'Customers', img: require('../assets/icons/customer-support.png'), to: '/customer' },
          { title: 'Vendors', img: require('../assets/icons/supplier.png'), to: '/vendor' },
          { title: 'Sales', img: require('../assets/icons/point-of-sale.png'), to: '/sales' },
          { title: 'Purchase', img: require('../assets/icons/shopping-bag.png'), to: '/purchases' },
          { title: 'Stock', img: require('../assets/icons/warehouse.png'), to: '/stock' },
          { title: 'Setting', img: require('../assets/icons/settings.png'), to: '/setting' },
          { title: 'About', img: require('../assets/icons/information.png'), to: '/about' }
        ],
      }),
  }
</script>

<style scoped>
  .container {
    padding: 105px;
  }

  .col {
    padding: 0px;
    max-width: 300px;
  }

  .center {
    margin: auto;  
  }

  .card {
    margin: 10px;
    padding: 10px;
  }

  .row {
    margin: auto;
  }
</style>
