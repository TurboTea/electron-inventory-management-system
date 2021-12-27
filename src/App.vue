<template>
  <v-app id="inspire">
    
    <v-navigation-drawer 
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Gestion
          </v-list-item-title>
          <v-list-item-subtitle>
            stock
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-avatar>
            <!-- <v-icon color="next">{{ item.icon }}</v-icon> -->
            <v-img
            left
            :src="item.img"
          >
          </v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon 
        color="next"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>
          <v-btn 
            icon
            color="next">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn 
            icon
            color="next">
            <v-icon>mdi-email</v-icon>
          </v-btn>
          <v-btn 
            icon
            color="next">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
          <v-btn 
            icon
            color="next">
            <v-icon>mdi-account</v-icon>
          </v-btn>
    </v-app-bar>

    <v-main>
      <router-view ></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      
      drawer: null,
      items: [
          { title: 'Accueil', img: require('./assets/icons/home.png'), to: '/' },
          { title: 'Dashboard', img: require('./assets/icons/dashboard.png'), to: '/dashboard' },
          { title: 'Products', img: require('./assets/icons/packaging.png'), to: '/product' },
          { title: 'Sales', img: require('./assets/icons/point-of-sale.png'), to: '/sales' },
          { title: 'Purchase', img: require('./assets/icons/shopping-bag.png'), to: '/purchases' },
          { title: 'Customers', img: require('./assets/icons/customer-support.png'), to: '/customer' },
          { title: 'Vendors', img: require('./assets/icons/supplier.png'), to: '/vendor' },
          { title: 'Invoice', img: require('./assets/icons/file.png'), to: '/invoice' },
          { title: 'Statistics', img: require('./assets/icons/statistics.png'), to: '/statistics' },
          { title: 'Stock', img: require('./assets/icons/warehouse.png'), to: '/stock' },
          { title: 'Setting', img: require('./assets/icons/settings.png'), to: '/setting' },
          { title: 'About', img: require('./assets/icons/information.png'), to: '/about' }
        ],
        right: null,
      }),
  }
</script>