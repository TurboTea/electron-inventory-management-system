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
          { title: 'Tableau de bord', img: require('../assets/icons/dashboard.png'), to: '/dashboard' },
          { title: 'Statistiques', img: require('../assets/icons/statistics.png'), to: '/dashboard' },
          { title: 'Factures', img: require('../assets/icons/file.png'), to: '/dashboard' },
          { title: 'Produits', img: require('../assets/icons/packaging.png'), to: '/product' },
          { title: 'Clients', img: require('../assets/icons/customer-support.png'), to: '/customer' },
          { title: 'Fournisseurs', img: require('../assets/icons/supplier.png'), to: '/vendor' },
          { title: 'Ventes', img: require('../assets/icons/point-of-sale.png'), to: '/sales' },
          { title: 'Achats', img: require('../assets/icons/shopping-bag.png'), to: '/purchases' },
          { title: 'Stock', img: require('../assets/icons/warehouse.png'), to: '/stock' },
          { title: 'Paramètres', img: require('../assets/icons/settings.png'), to: '/setting' },
          { title: 'À propos', img: require('../assets/icons/information.png'), to: '/about' }
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
