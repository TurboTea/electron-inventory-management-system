<template>
<v-container fluid>
  <v-card
    class="elevation-4"
    shaped
  >
    <v-card-text>
      <v-row>
        <v-col>
          <div>Customer:</div>
          <p class="text-h6 text--primary">
            {{ CustomerInfo.raison }}
          </p>
          <div>Sale date:</div>
          <p class="text-h6 text--primary">
            {{ formatDate(SaleInfo.date) }}
          </p>
            </v-col>
          <v-col>
              <div>Taxes</div>
              <p class="text-h6 text--primary">
                {{ SaleInfo.totalTaxes }}
              </p>
              <div>Untaxed Amount</div>
              <p class="text-h6 text--primary">
                {{ SaleInfo.totalUntaxedAmount }}
              </p>
              
            </v-col>
            <v-col>
          <div>Total:</div>
          <p class="text-h6 text--primary">
            {{ SaleInfo.total_price }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  
  <v-data-table
    :headers="headers"
    :items="productSales"
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
        <v-toolbar-title>{{ SaleInfo.code }}</v-toolbar-title>
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="5"
                  >
                   <v-select
                      :items="taxes"
                      label="Taxes"
                      item-value="_id"
                      item-text="name"
                      v-model="editedItem.taxId"
                      single-line
                      
                    ></v-select>
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
        { text: 'Tax', value: 'taxId.name' },
        { text: 'Sub Total', value: 'subTotal' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      productSales: [],
      products: [],
      SaleInfo: [],
      CustomerInfo: [],
      taxes: [],
      tax_value: '',
      untaxed_value: '',
      sub_total: '',
      ancienAmount: '',
      newAmount: '',
      editedIndex: -1,
      editedItem: {
        productId: '',
        amount: '',
        price: '',
        taxId: ''
      },
      defaultItem: {
        productId: '',
        amount: '',
        price: '',
        taxId: ''
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

      loadProductSales() {
        ipcRenderer.send('productSales:load', this.id),
        ipcRenderer.on('productSales:get', (e, productSales) => {
          this.productSales = JSON.parse(productSales)
        })
      },

      loadProducts() {
        ipcRenderer.send('products:load'),
        ipcRenderer.on('products:get', (e, products) => {
          this.products = JSON.parse(products)
          // this.products = this.products.filter(product => !this.productSales.find(productSale => (product._id == productSale.productId._id )) )
        })
      },

      loadCustomerSale() {
        ipcRenderer.send('customerSale:load', this.id),
        ipcRenderer.on('customerSale:get', (e, customerSale) => {
          this.SaleInfo = JSON.parse(customerSale)
          this.SaleInfo = this.SaleInfo[0]
          this.CustomerInfo = this.SaleInfo.customerId
        })
      },

      loadTaxes() {
        ipcRenderer.send('taxes:load'),
          ipcRenderer.on('taxes:get', (e, taxes) => {
          this.taxes = JSON.parse(taxes)
          this.taxes = this.taxes.filter(item => item.typeTax === "sale")
        })
      },
      
      initialize () {
        this.loadProductSales()
        this.loadProducts()
        this.loadCustomerSale()
        this.loadTaxes()
      },

      editItem (item) {
        this.editedIndex = this.productSales.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.ancienAmount = this.editedItem.amount
      },

      deleteItem (item) {
        this.editedIndex = this.productSales.indexOf(item)
        this.editedItem = Object.assign({}, item)
        // this.editedIndex = item._id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        ipcRenderer.send('productSales:delete', this.editedItem)
        ipcRenderer.send('stock:plus', this.editedItem)
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

      calculateTaxes () {
        let result 
        if (this.editedIndex > -1) {
            result = this.taxes.find(item => item._id == this.editedItem.taxId._id).valueTax;
          } else {
            result = this.taxes.find(item => item._id == this.editedItem.taxId).valueTax;
          }
        this.tax_value = this.editedItem.amount * this.editedItem.price * ( result / 100 )
        this.untaxed_value = this.editedItem.amount * this.editedItem.price
      },

      calculateTotalPrice () {
        this.calculateTaxes ()
        this.sub_total = this.editedItem.amount * this.editedItem.price + this.tax_value
        this.SaleInfo.total_price = this.SaleInfo.total_price + this.sub_total
        this.SaleInfo.totalUntaxedAmount = this.SaleInfo.totalUntaxedAmount + this.untaxed_value
        this.SaleInfo.totalTaxes = this.SaleInfo.totalTaxes + this.tax_value
      },

      updateStockAmount() {
        let quantity;
          if ( this.ancienAmount == this.newAmount ) {
            quantity = 0;
          } else if ( this.ancienAmount > this.newAmount ) {
            quantity = this.ancienAmount - this.newAmount
            this.editedItem = Object.assign(this.editedItem, { amount: quantity })
            ipcRenderer.send('stock:plus', this.editedItem)
          } else if ( this.ancienAmount < this.newAmount ) {
            quantity = this.newAmount - this.ancienAmount
            this.editedItem = Object.assign(this.editedItem, { amount: quantity })
            ipcRenderer.send('stock:minus', this.editedItem)
          }
      },

      save () {
        this.calculateTotalPrice ()
        let item = {
          saleId: this.id,
          productId: this.editedItem.productId,
          amount: this.editedItem.amount,
          price: this.editedItem.price,
          taxId: this.editedItem.taxId,
          untaxedAmount: this.untaxed_value,
          taxes: this.tax_value,
          subTotal: this.sub_total
        }
        
        if (this.editedIndex > -1) {
          this.newAmount = this.editedItem.amount
          this.updateStockAmount()
          this.editedItem = Object.assign(this.editedItem, { productId: item.productId, 
                                                                        amount: item.amount, 
                                                                        price: item.price,
                                                                        taxId: item.taxId,
                                                                        untaxedAmount: item.untaxedAmount,
                                                                        taxes: item.taxes,  
                                                                        subTotal: item.subTotal })
          ipcRenderer.send('productSales:edit', this.editedItem)
          ipcRenderer.send('saleTotals:edit', this.SaleInfo)
        } else { 
        ipcRenderer.send('productSales:add', item)
        ipcRenderer.send('stock:minus', item)
        ipcRenderer.send('saleTotals:edit', this.SaleInfo)
        }
        this.close()
      },
    },
  }
</script>

