<template>
<v-container fluid>
  <v-card
    class="elevation-4"
    shaped
  >
    <v-card-text>
      <v-row>
        <v-col>
          <div>{{ $t('Customer') }}</div>
          <p class="text-h6 text--primary">
            {{ CustomerInfo.raison }}
          </p>
          <div>{{ $t('SaleDate') }}</div>
          <p class="text-h6 text--primary">
            {{ formatDate(SaleInfo.date) }}
          </p>
            </v-col>
          <v-col>
              <div>{{ $t('Taxes') }}</div>
              <p class="text-h6 text--primary">
                {{ formatNumber(SaleInfo.totalTaxes) }}
              </p>
              <div>{{ $t('UntaxedAmount') }}</div>
              <p class="text-h6 text--primary">
                {{ formatNumber(SaleInfo.totalUntaxedAmount) }}
              </p>
              
            </v-col>
            <v-col>
          <div>{{ $t('Total') }}</div>
          <p class="text-h6 text--primary">
            {{ formatNumber(SaleInfo.totalPrice) }}
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
    :footer-props="{
        'items-per-page-text': $t('RowsPerPage'),           
    }"
  >
    <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ header }">
      {{ $t(header.text) }}
    </template>

    <template v-slot:item.date="{ item }">
      {{ formatDate(item.date) }}
    </template>

    <template v-slot:item.subTotal="{ item }">
      {{ formatNumber(item.subTotal) }}
    </template>

    <template v-slot:item.price="{ item }">
      {{ formatNumber(item.price) }}
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
            :label="$t('Search')"
            single-line
            hide-details
            class="shrink mx-4"
        ></v-text-field>

        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="700px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              dark
              icon
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon large>
                mdi-plus-circle
              </v-icon>
            </v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ $t(formTitle) }}</span>
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
                      :label="$t('Products')"
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
                      :label="$t('Quantity')"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.price"
                      :label="$t('Price')"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                   <v-select
                      :items="taxes"
                      :label="$t('Taxes')"
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
                color="error"
                @click="close"
              >
                {{ $t('Cancel') }}
              </v-btn>
              <v-btn
                color="success"
                @click="save"
              >
                {{ $t('Save') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="700px">
          <v-card>
            <v-card-title class="text-h5 justify-center">{{ $t('AreYouSureYouWantToDeleteThisItem') }}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="red" @click="closeDelete">{{ $t('Cancel') }}</v-btn>
              <v-btn dark color="success" @click="deleteItemConfirm">{{ $t('OK') }}</v-btn>
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
        color="primary"
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
        <v-icon>
          mdi-reload
        </v-icon>
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
          text: 'Products',
          align: 'start',
          sortable: false,
          value: 'productId.name',
        },
        { text: 'Description', value: "productId.designation" },
        { text: 'Quantity', value: "amount" },
        { text: 'UnitPrice', value: 'price' },
        { text: 'Taxes', value: 'taxId.name' },
        { text: 'SubTotal', value: 'subTotal' },
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
        amount: 0,
        price: 0,
        taxId: '',
        untaxedAmount: 0,
        taxes: 0,
        subTotal: 0
      },
      defaultItem: {
        productId: '',
        amount: 0,
        price: 0,
        taxId: '',
        untaxedAmount: 0,
        taxes: 0,
        subTotal: 0
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New' : 'Edit'
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
        return moment(value).locale(this.$i18n.locale).format("MMMM DD YYYY, h:mm:ss a")
      },

      formatNumber(value) {
        return new Intl.NumberFormat(this.$i18n.locale, { style: 'currency', currency: 'DZD' }).format(value)
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

      loadSaleInfo() {
        ipcRenderer.send('saleInfo:load', this.id),
        ipcRenderer.on('saleInfo:get', (e, saleInfo) => {
          this.SaleInfo = JSON.parse(saleInfo)
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
        this.loadSaleInfo()
        this.loadTaxes()
      },

      editItem (item) {
        this.editedIndex = this.productSales.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.ancienAmount = this.editedItem.amount
        this.untaxed_value = this.editedItem.untaxedAmount
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
        this.subtractionTotals ()
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
        this.editedItem.taxes = this.editedItem.amount * this.editedItem.price * ( result / 100 )
        this.editedItem.untaxedAmount = this.editedItem.amount * this.editedItem.price
      },

      calculateTotals () {
        this.calculateTaxes ()
        this.editedItem.subTotal = this.editedItem.amount * this.editedItem.price + this.editedItem.taxes
        this.SaleInfo.totalPrice = this.SaleInfo.totalPrice + this.editedItem.subTotal
        this.SaleInfo.totalUntaxedAmount = this.SaleInfo.totalUntaxedAmount + this.editedItem.untaxedAmount
        this.SaleInfo.totalTaxes = this.SaleInfo.totalTaxes + this.editedItem.taxes
      },

      subtractionTotals () {
        this.SaleInfo.totalPrice = this.SaleInfo.totalPrice - this.editedItem.subTotal
        this.SaleInfo.totalUntaxedAmount = this.SaleInfo.totalUntaxedAmount - this.editedItem.untaxedAmount
        this.SaleInfo.totalTaxes = this.SaleInfo.totalTaxes - this.editedItem.taxes
      
        ipcRenderer.send('saleTotals:edit', this.SaleInfo)
      },

      updateTotals () {

        // get tax value 
        let result 
        if (this.editedIndex > -1) {
            result = this.taxes.find(item => item._id == this.editedItem.taxId._id).valueTax;
          } else {
            result = this.taxes.find(item => item._id == this.editedItem.taxId).valueTax;
          }

        // calculate untaxed value
        this.untaxed_value = this.editedItem.amount * this.editedItem.price
        
        //calculate the defrence 
        let deffTotal;
        let tax_value;
        let subTotal;
          if ( this.untaxed_value == this.editedItem.untaxedAmount ) {
            deffTotal = 0;
          } else if ( this.untaxed_value > this.editedItem.untaxedAmount ) {
            //calculate the defrence betwen the new and the old untaxed value
            deffTotal = this.untaxed_value - this.editedItem.untaxedAmount

            //calculate tax value for the defrence
            tax_value = deffTotal * ( result / 100 )
            subTotal = deffTotal + tax_value

            //update totals value
            this.editedItem.subTotal = this.editedItem.subTotal + subTotal
            this.SaleInfo.totalPrice = this.SaleInfo.totalPrice + subTotal
            this.SaleInfo.totalUntaxedAmount = this.SaleInfo.totalUntaxedAmount + deffTotal
            this.SaleInfo.totalTaxes = this.SaleInfo.totalTaxes + tax_value

            //
            ipcRenderer.send('saleTotals:edit', this.SaleInfo)
            this.editedItem.untaxedAmount = this.untaxed_value

          } else if ( this.untaxed_value < this.editedItem.untaxedAmount ) {
            deffTotal = this.editedItem.untaxedAmount - this.untaxed_value
            
            //calculate tax value for the defrence
            tax_value = deffTotal * ( result / 100 )
            subTotal = deffTotal + tax_value

            //update totals value
            this.editedItem.subTotal = this.editedItem.subTotal - subTotal
            this.SaleInfo.totalPrice = this.SaleInfo.totalPrice - subTotal
            this.SaleInfo.totalUntaxedAmount = this.SaleInfo.totalUntaxedAmount - deffTotal
            this.SaleInfo.totalTaxes = this.SaleInfo.totalTaxes - tax_value

            ipcRenderer.send('saleTotals:edit', this.SaleInfo)
            this.editedItem.untaxedAmount = this.untaxed_value
            
          }
      },

      updateStockAmount(item) {
        let stockItem = {
          productId: item.productId,
          amount: ''
        }
        let quantity;
          if ( this.ancienAmount == this.newAmount ) {
            quantity = 0;
          } else if ( this.ancienAmount > this.newAmount ) {
            quantity = this.ancienAmount - this.newAmount
            stockItem = Object.assign(stockItem, { amount: quantity })
            ipcRenderer.send('stock:plus', stockItem)
          } else if ( this.ancienAmount < this.newAmount ) {
            quantity = this.newAmount - this.ancienAmount
            stockItem = Object.assign(stockItem, { amount: quantity })
            ipcRenderer.send('stock:minus', stockItem)
          }
      },

      createProductSale () { 
        ipcRenderer.send('productSales:add', this.editedItem)
      },

      removeAmountFromStock () {
        ipcRenderer.send('stock:minus', this.editedItem)
      },

      save () {
        this.editedItem.saleId = this.id
        if (this.editedIndex > -1) {
          this.newAmount = this.editedItem.amount
          this.updateStockAmount(this.editedItem)
          this.updateTotals ()
          ipcRenderer.send('productSales:edit', this.editedItem)
          // ipcRenderer.send('purchaseTotals:edit', this.PurchaseInfo)
        } else { 
        this.calculateTotals (),
        this.createProductSale (),
        this.removeAmountFromStock (),
        ipcRenderer.send('saleTotals:edit', this.SaleInfo)
        }
        this.close()
      },
    },
  }
</script>

<style scoped>
  .v-card__title {
    background-color: #00366f;
    color: white;
  }
  .v-card__actions {
    background-color: #00366f;
  }
 
</style>
