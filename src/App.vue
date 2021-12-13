<template>
  <v-app id="inspire">
    
    <v-navigation-drawer 
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
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
          <v-list-item-icon>
            <v-icon color="next">{{ item.icon }}</v-icon>
          </v-list-item-icon>

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
          { title: 'Accueil', icon: 'mdi-home', to: '/' },
          { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
          { title: 'Products', icon: 'mdi-basket', to: '/product' },
          { title: 'Sales', icon: 'mdi-cash-register', to: '/sale' },
          { title: 'Purchase', icon: 'mdi-cart-variant', to: '/purchase' },
          { title: 'Customers', icon: 'mdi-account-group-outline', to: '/customer' },
          { title: 'Providers', icon: 'mdi-account-group', to: '/provider' },
          { title: 'Invoice', icon: 'mdi-receipt', to: '/provider' },
          { title: 'Statistics', icon: 'mdi-finance', to: '/provider' },
          { title: 'Stock', icon: 'mdi-warehouse', to: '/stock' },
          { title: 'Setting', icon: 'mdi-cog', to: '/setting' },
          { title: 'About', icon: 'mdi-information', to: '/about' }
        ],
        right: null,
      }),
  }
</script>