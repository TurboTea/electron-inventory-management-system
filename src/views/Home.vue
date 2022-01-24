<template>
  <v-container fluid>
        <v-row >
          <v-col
            v-for="item in items"
            :key="item.title"
          >     
            
          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
               <v-list-item-avatar
                tile
                size="120"
                
              ><v-img           
                contain
                :src="item.img"
              >
                </v-img></v-list-item-avatar>
              <v-list-item-content>
                <div class="text-h5 mb-2">
                  {{ $t(item.title) }}
                </div>
                <v-list-item-title class="text-overline red--text mb-1" >
                  {{ $t(item.model) }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ $t(item.description) }}</v-list-item-subtitle>
              </v-list-item-content>

             
            </v-list-item>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                rounded
                
                :to="item.to"
                :disabled="item.title === 'Home'"
                color="teal accent-4"
              >
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>
               
          </v-col>
        </v-row>
     
  </v-container>
</template>

<script>
  export default {
    data: () => ({ 
      items: [
          { title: 'Home', img: require('../assets/icons/couleur/home.png'), to: '/', model: 'component', description: 'component that display home menu' },
          { title: 'Dashboard', img: require('../assets/icons/couleur/dashboard.png'), to: '/dashboard', model: 'component', description: 'component that display dashboard' },
          { title: 'Products', img: require('../assets/icons/couleur/packaging.png'), to: '/products', model: 'Product', description: 'module that handle products CRUD functionality' },
          { title: 'Sales', img: require('../assets/icons/couleur/point_of_sale.png'), to: '/sales', model: 'Sale', description: 'module that handle sales CRUD functionality' },
          { title: 'Purchases', img: require('../assets/icons/couleur/shopping-bag.png'), to: '/purchases', model: 'Purchase', description: 'module that handle Purchases CRUD functionality' },
          { title: 'Clients', img: require('../assets/icons/couleur/customer-support.png'), to: '/customer', model: 'Customer', description: 'module that handle Customers CRUD functionality' },
          { title: 'Suppliers', img: require('../assets/icons/couleur/supplier.png'), to: '/vendor', model: 'Vendor', description: 'module that handle Suppliers CRUD functionality' },
          { title: 'Invoices', img: require('../assets/icons/couleur/file.png'), to: '/invoice', model: 'component', description: '' },
          { title: 'Statistics', img: require('../assets/icons/couleur/statistics.png'), to: '/statistics', model: 'component', description: '' },
          { title: 'Stock', img: require('../assets/icons/couleur/warehouse.png'), to: '/stock', model: 'Stock', description: 'module that handle Stocks CRUD functionality' },
          { title: 'Settings', img: require('../assets/icons/couleur/settings.png'), to: '/setting', model: 'component', description: 'component that display Settings' },
          { title: 'About', img: require('../assets/icons/couleur/information.png'), to: '/about', model: 'component', description: 'component that display About' }


        ],
      }),
  }
</script>

<style scoped>
  
  

</style>
