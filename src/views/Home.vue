<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="item in items"
        :key="item.title"
      >     
        <v-card 
          hover
          class="card"
          :to="item.to"
          :disabled="item.title === 'Home'"
        >
        <!-- <v-icon>{{ item.icon }}</v-icon> -->
          <v-img
            contain
            width="100%"
            :src="item.img"
          >
          </v-img>
          <v-card-title>{{ $t(item.title) }}</v-card-title>
        </v-card>    
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({ 
      items: [
          { title: 'Home', img: require('../assets/icons/couleur/home.png'), to: '/' },
          { title: 'Dashboard', img: require('../assets/icons/couleur/dashboard.png'), to: '/dashboard' },
          { title: 'Products', img: require('../assets/icons/couleur/packaging.png'), to: '/products' },
          { title: 'Sales', img: require('../assets/icons/couleur/point_of_sale.png'), to: '/sales' },
          { title: 'Purchases', img: require('../assets/icons/couleur/packaging.png'), to: '/purchases' },
          { title: 'Clients', img: require('../assets/icons/couleur/customer-support.png'), to: '/customer' },
          { title: 'Suppliers', img: require('../assets/icons/couleur/supplier.png'), to: '/vendor' },
          { title: 'Invoices', img: require('../assets/icons/couleur/file.png'), to: '/invoice' },
          { title: 'Statistics', img: require('../assets/icons/couleur/statistics.png'), to: '/statistics' },
          { title: 'Stock', img: require('../assets/icons/couleur/warehouse.png'), to: '/stock' },
          { title: 'Settings', img: require('../assets/icons/couleur/settings.png'), to: '/setting' },
          { title: 'About', img: require('../assets/icons/couleur/information.png'), to: '/about' }

          // { title: 'Home', img: require('../assets/icons/simple/home_blue.png'), to: '/' },
          // { title: 'Dashboard', img: require('../assets/icons/simple/dashboard_blue.png'), to: '/dashboard' },
          // { title: 'Products', img: require('../assets/icons/simple/boxes_blue.png'), to: '/products' },
          // { title: 'Sales', img: require('../assets/icons/simple/sale_blue.png'), to: '/sales' },
          // { title: 'Purchases', img: require('../assets/icons/simple/purchase_blue.png'), to: '/purchases' },
          // { title: 'Clients', img: require('../assets/icons/simple/users_blue.png'), to: '/customer' },
          // { title: 'Suppliers', img: require('../assets/icons/simple/users_blue.png'), to: '/vendor' },
          // { title: 'Invoices', img: require('../assets/icons/simple/file_blue.png'), to: '/invoice' },
          // { title: 'Statistics', img: require('../assets/icons/simple/statistics_blue.png'), to: '/statistics' },
          // { title: 'Stock', img: require('../assets/icons/simple/warehouse_blue.png'), to: '/stock' },
          // { title: 'Settings', img: require('../assets/icons/simple/cogs_blue.png'), to: '/setting' },
          // { title: 'About', img: require('../assets/icons/simple/info_blue.png'), to: '/about' }
          
        ],
      }),
  }
</script>

<style scoped>
  .container {
    padding-top: 10px;
  }

  .col {
    padding: 0px;
    max-width: 250px;
  }

  .card {
    margin: 10px;
    padding: 10px;
  }

  .row {
    margin: auto;
  }
</style>
