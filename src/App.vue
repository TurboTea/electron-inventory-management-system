<template>
  <v-app id="inspire">
    
    <v-navigation-drawer 
      v-model="drawer"
      app
      color="next"
      dark
      :right="this.$i18n.locale == 'ar'"
    >
      <v-list-item>
        <v-list-item-avatar color="white">
          <v-img           
            contain
            src="./assets/icons/logo.png"
          >
          </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
        
          <v-list-item-title class="text-h6">
            {{ $t('CompanyName')}} 
          </v-list-item-title>
          
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
        shaped
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-avatar
          >
            <v-icon>{{ item.icon }}</v-icon>
            <!-- <v-img
              left
              :src="item.img"
            >
          </v-img> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon 
        color="next"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <!-- <v-toolbar-title>Application</v-toolbar-title> -->

      <v-spacer></v-spacer>
          <!-- <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="next"
                dark
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  mdi-translate
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> -->
          <v-btn text><LocaleChanger /></v-btn>
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
  import LocaleChanger from './components/LocaleChanger.vue'

  export default {
    components: {
    LocaleChanger
    },
    data: () => ({ 
      
      drawer: null,
      items: [
          // { title: 'Accueil', img: require('./assets/icons/home.png'), to: '/' },
          // { title: 'Dashboard', img: require('./assets/icons/dashboard.png'), to: '/dashboard' },
          // { title: 'Products', img: require('./assets/icons/packaging.png'), to: '/products' },
          // { title: 'Sales', img: require('./assets/icons/point-of-sale.png'), to: '/sales' },
          // { title: 'Purchase', img: require('./assets/icons/shopping-bag.png'), to: '/purchases' },
          // { title: 'Customers', img: require('./assets/icons/customer-support.png'), to: '/customer' },
          // { title: 'Vendors', img: require('./assets/icons/supplier.png'), to: '/vendor' },
          // { title: 'Invoice', img: require('./assets/icons/file.png'), to: '/invoice' },
          // { title: 'Statistics', img: require('./assets/icons/statistics.png'), to: '/statistics' },
          // { title: 'Stock', img: require('./assets/icons/warehouse.png'), to: '/stock' },
          // { title: 'Setting', img: require('./assets/icons/settings.png'), to: '/setting' },
          // { title: 'About', img: require('./assets/icons/information.png'), to: '/about' }

          { title: 'Home', icon: 'mdi-home', to: '/' },
          { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
          { title: 'Products', icon: 'mdi-basket', to: '/products' },
          { title: 'Sales', icon: 'mdi-cash-register', to: '/sales' },
          { title: 'Purchases', icon: 'mdi-cart-variant', to: '/purchases' },
          { title: 'Clients', icon: 'mdi-account-group-outline', to: '/customer' },
          { title: 'Suppliers', icon: 'mdi-account-group', to: '/vendor' },
          { title: 'Invoices', icon: 'mdi-receipt', to: '/invoice' },
          { title: 'Statistics', icon: 'mdi-finance', to: '/statistics' },
          { title: 'Stock', icon: 'mdi-warehouse', to: '/stock' },
          { title: 'Settings', icon: 'mdi-cog', to: '/setting' },
          { title: 'About', icon: 'mdi-information', to: '/about' }
        ],
        right: null,
      }),
  }
</script>
<style scoped>

  /* .v-list-item--active {
  background-color: white;
  color: black !important;
} */
/* .v-avatar {
  background-color: white;
} */
</style>