<template>
<v-container fluid>
  <v-card
    class="elevation-4"
    shaped
  >
    <v-card-text>
      <div>Vendor:</div>
      <p class="text-h6 text--primary">
        {{ VendorInfo.raison }}
      </p>
       <div>Purchase date:</div>
      <p class="text-h6 text--primary">
        {{ formatDate(PurchaseInfo.date) }}
      </p>
      <div>Total:</div>
      <p class="text-h6 text--primary">
        {{ PurchaseInfo.total_price }}
      </p>
      
    </v-card-text>
  </v-card>
  
  <v-data-table
    :headers="headers"
    :items="productPurchases"
    :search="search"
    sort-by="code"
    class="elevation-4 mt-4"
    
  >
    <template v-slot:item.date="{ item }">
      {{ formatDate(item.date) }}
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{ PurchaseInfo.code }}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="shrink mx-4"
        ></v-text-field>

        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="next"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      :items="products"
                      label="Products"
                      item-value="_id"
                      item-text="name"
                      v-model="editedItem.productId"
                    ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.amount"
                      label="Amount"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.price"
                      label="Price"
                    ></v-text-field>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="next"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="next"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="next" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="next" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        color="next"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        color="red"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="next"
        dark
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  </v-container>
</template>

<script>
  import {ipcRenderer} from "electron";
  import moment from 'moment'
  
  export default {
    data: () => ({
      id: '',
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Product',
          align: 'start',
          sortable: false,
          value: 'productId.name',
        },
        { text: 'Description', value: "productId.designation" },
        { text: 'Quantity', value: "amount" },
        { text: 'Unit Price', value: 'price' },
        { text: 'Sub Total', value: 'subTotal' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      productPurchases: [],
      products: [],
      PurchaseInfo: [],
      VendorInfo: [],
      editedIndex: -1,
      editedItem: {
        productId: '',
        amount: '',
        price: ''
      },
      defaultItem: {
        productId: '',
        amount: '',
        price: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created() {
      this.getRouteId()
    },

    methods: {
      getRouteId() {
          this.id = this.$route.params.id,
          this.initialize()
      },

      formatDate(value) {
        return moment(value).format("MMMM DD YYYY, h:mm:ss a")
      },
      
      initialize () {
        ipcRenderer.send('productPurchases:load', this.id),
        ipcRenderer.on('productPurchases:get', (e, productPurchases) => {
          this.productPurchases = JSON.parse(productPurchases)
        })
        ipcRenderer.send('products:load'),
        ipcRenderer.on('products:get', (e, products) => {
          this.products = JSON.parse(products)
        })
        ipcRenderer.send('vendorPurchase:load', this.id),
        ipcRenderer.on('vendorPurchase:get', (e, vendorPurchase) => {
          this.PurchaseInfo = JSON.parse(vendorPurchase)
          this.PurchaseInfo = this.PurchaseInfo[0]
          this.VendorInfo = this.PurchaseInfo.vendorId
        })
      },

      editItem (item) {
        this.editedIndex = this.productPurchases.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.productPurchases.indexOf(item)
        this.editedItem = Object.assign({}, item)
        // this.editedIndex = item._id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        ipcRenderer.send('productPurchases:delete', this.editedItem)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        let sub_total = this.editedItem.amount * this.editedItem.price
        console.log('this.PurchaseInfo', this.PurchaseInfo)
        this.PurchaseInfo.total_price = this.PurchaseInfo.total_price + sub_total
        let item = {
          purchaseId: this.id,
          productId: this.editedItem.productId,
          amount: this.editedItem.amount,
          price: this.editedItem.price,
          subTotal: sub_total
        }
        
        
        if (this.editedIndex > -1) {
          this.editedItem = Object.assign(this.editedItem, { productId: item.productId, amount: item.amount, price: item.price, subTotal: item.subTotal })
          ipcRenderer.send('productPurchases:edit', this.editedItem)
        } else { 
          ipcRenderer.send('productPurchases:add', item)
          ipcRenderer.send('stock:plus', item)
          ipcRenderer.send('purchaseTotalPrice:edit', this.PurchaseInfo)
        }
        this.close()
      },
    },
  }
</script>

