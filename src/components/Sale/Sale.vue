<template>
<v-container fluid>
  <div>
    <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          :filename="$t('Sales')"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="800px"

          ref="html2Pdf"
    >
          <section slot="pdf-content">
            <v-container fluid style="padding-top: 30px;">
              <v-container fluid>
                <v-row>
                  <v-col>

                    <v-card
                        class="mx-auto"
                        max-width="700"
                        outlined
                    >
                        <v-card-title style="background-color: #ffffff;color: black">
                        <v-avatar size="60">
                          <v-img 
                              :src="companyInfo.logo"
                              contain
                              width="100%"
                          />
                        </v-avatar>
                        <p class="ml-3" style="text-indent: 10px;">
                          {{ $t(companyInfo.companyName) }}
                        </p>
                      </v-card-title>
                    </v-card>
                  </v-col>
                
                  <v-col>
                    <h1 style="border: 1px solid; padding: 12px;text-align: center; background-color: #f2f2f2;">{{ $t('SaleOrder') }}</h1>
                  </v-col>
                </v-row>
              </v-container>

             <v-container fluid>
                  <div style="width: 100%;" >
                    <v-row style="padding: 12px;">
                      <v-col cols="6">

                         <v-row style="padding: 8px">
                          <p> 
                            {{ $t('Address') }}:
                          </p>
                          <p style="text-indent: 10px;">
                            {{ companyInfo.street }}, {{ companyInfo.state }}, {{ companyInfo.city }} , {{ companyInfo.country }}
                          </p>
                        </v-row>

                        <v-row style="padding: 8px">
                          <p>
                            {{ $t('NIS') }}:
                          </p>
                          <p style="text-indent: 10px;">
                            {{ companyInfo.statisticalIdentifierNumber }}
                          </p>
                        </v-row>
                        <v-row style="padding: 8px">
                          <p> 
                            {{ $t('NIF') }}:
                          </p>
                          <p style="text-indent: 10px;">
                            {{ companyInfo.taxIdentifierNumber }}
                          </p>
                        </v-row>

                        <v-row style="padding: 8px">
                          <p> 
                            {{ $t('RC') }}:
                          </p>
                          <p style="text-indent: 10px;">
                            {{ companyInfo.commercialRegisterNumber }}
                          </p>
                        </v-row>
                        <br>
                        <hr>
                        <br>

                        <v-row style="padding: 8px">
                          <p>
                            {{ $t('SaleDate') }}
                          </p>
                          <p style="text-indent: 10px;">
                            {{ formatDate(SaleInfo.date) }}
                          </p>
                         </v-row>
                      </v-col>

                      <v-spacer></v-spacer>

                      <v-col cols="6" style="border: 1px solid;">
                        <h1 style="text-align: center;">{{ $t('Customer') }}</h1>
                        <br>

                        <v-row style="padding: 8px">
                          <p>
                            {{ $t('Name') }}:
                          </p>
                          <p style="text-indent: 10px;">
                            {{ CustomerInfo.raison }}
                          </p>
                        </v-row>

                        <v-row style="padding: 8px">
                          <p>
                            {{ $t('Phone') }}:
                          </p>
                          <p style="text-indent: 10px;">
                            {{ CustomerInfo.phone }}
                          </p>
                        </v-row>
                        <v-row style="padding: 8px">
                          <p> 
                            {{ $t('Address') }}:
                          </p>
                          <p style="text-indent: 10px;">
                            {{ CustomerInfo.street }}, {{ CustomerInfo.state }}, {{ CustomerInfo.city }} , {{ CustomerInfo.country }}
                          </p>
                        </v-row>
                        <v-row style="padding: 8px">
                          <p> 
                            {{ $t('NIS') }}:
                          </p>
                          <p>
                            {{ CustomerInfo.statisticalIdentifierNumber }}
                          </p>
                        </v-row>
                        <v-row style="padding: 8px">
                          <p> 
                            {{ $t('NIF') }}:
                          </p>
                          <p style="text-indent: 10px;">
                            {{ CustomerInfo.taxIdentifierNumber }}
                          </p>
                        </v-row>
                        <v-row style="padding: 8px">
                          <p> 
                            {{ $t('RC') }}:
                          </p>
                          <p style="text-indent: 10px;">
                            {{ CustomerInfo.commercialRegisterNumber }}
                          </p>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
            </v-container>
            <br>

            <v-container fluid>

              <v-data-table
                :headers="headers"
                :items="productSales"
                hide-default-footer
                hide-default-header
                sort-by="code"
                class="elevation-4"
              >
              <template v-slot:header="{ props: { headers } }">
                  <thead>
                    <tr>
                      <th v-for="header in headers" :key="header.text" class="pdf-table">

                        <div :key="header.text" v-if="header.text == 'Actions'">{{  }}</div>
                        
                        <div :key="header.text" v-else>
                          <span class="pdf-style">
                            {{ $t(header.text) }}
                          </span>
                        </div>
                          
                      </th>
                    </tr>
                  </thead>
              </template>
                <!-- <template v-slot:footer>
                  <div style="float: right">
                    <v-row>
                      <div style="text-indent: 50px;">
                        {{ $t('Taxes') }}

                        <p class="text-h6" style="float: right;">
                          {{ formatNumber(SaleInfo.totalTaxes) }}
                        </p>
                      </div>
                    </v-row>
                    <v-row>
                      <div style="text-indent: 50px;">
                        {{ $t('UntaxedAmount') }}

                        <p class="text-h6" style="float: right;">
                          {{ formatNumber(SaleInfo.totalUntaxedAmount) }}
                        </p>
                      </div>
                    </v-row>
                    <v-row>
                      <div style="text-indent: 50px;">
                        {{ $t('Total') }}

                        <p class="text-h6" style="float: right;">
                          {{ formatNumber(SaleInfo.totalPrice) }}
                        </p>
                      </div>
                    </v-row>
                  </div>
                </template> -->
                


                <template v-slot:[`item.date`]="{ item }">
                  {{ formatDate(item.date) }}
                </template>

                <template v-slot:[`item.subTotal`]="{ item }">
                  {{ formatNumber(item.subTotal) }}
                </template>

                <template v-slot:[`item.price`]="{ item }">
                  {{ formatNumber(item.price) }}
                </template>

              </v-data-table>
            </v-container>
              <!--  -->
              <v-container fluid>
                  <div style="width: 100%;" >
                    <v-row style="padding: 12px;">
                      <v-col cols="6">
                      </v-col>

                      <v-spacer></v-spacer>

                      <v-col cols="6" style="border: 1px solid;">
                        <v-row>
                          <v-col>
                            <p>
                              {{ $t('Taxes') }}:
                            </p>
                          </v-col>
                          <v-col>
                            <p>
                              {{ formatNumber(SaleInfo.totalTaxes) }}
                            </p>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col>
                            <p>
                              {{ $t('UntaxedAmount') }}:
                            </p>
                          </v-col>
                          <v-col>
                            <p>
                              {{ formatNumber(SaleInfo.totalUntaxedAmount) }}
                            </p>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <p> 
                              {{ $t('Total') }}:
                            </p>
                          </v-col>
                          <v-col>
                            <p>
                              {{ formatNumber(SaleInfo.totalPrice) }}
                            </p>
                          </v-col>
                        </v-row>
                        
                       
                        
                      </v-col>
                    </v-row>
                  </div>
            </v-container>
             <!-- <v-container fluid>
                  
                    <v-row>
                      <v-col>
                      </v-col>
                      

                      <v-col style="border: 1px solid;" >
                        <v-row>
                          <div class="col" style="padding: 8px;">
                            {{ $t('Taxes') }}:
                          </div>
                          <p class="col" style="padding: 8px;">
                            {{ formatNumber(SaleInfo.totalTaxes) }}
                          </p>
                        </v-row>
                        <v-row>
                          <div class="col text-right" style="padding: 8px;">
                            {{ $t('UntaxedAmount') }}:
                          </div>
                          <p class="col" style="padding: 8px;">
                            {{ formatNumber(SaleInfo.totalUntaxedAmount) }}
                          </p>
                        </v-row>
                        <v-row>
                          <div class="col text-right" style="padding: 8px;"> 
                            {{ $t('Total') }}:
                          </div>
                          <p class="col" style="padding: 8px;">
                            {{ formatNumber(SaleInfo.totalPrice) }}
                          </p>
                        </v-row>
                      </v-col>
                      
                    </v-row>
             </v-container> -->
             <!--  -->
             <!-- <v-container class="grey lighten-5">
                <v-row no-gutters>
                  <template v-for="n in 4">
                    <v-col :key="n">
                      <v-card
                        class="pa-2"
                        outlined
                        tile
                      >
                        Column1
                      </v-card>
                    </v-col>
                    <v-responsive
                      v-if="n === 2"
                      :key="`width-${n}`"
                      width="100%"
                    ></v-responsive>
                  </template>
                </v-row>
              </v-container> -->
            <v-container>
              <v-row>
                <v-col >
                  <h4>Date</h4>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                  <h4>Signature</h4>
                </v-col>
              </v-row>
            </v-container>

             


            </v-container>
              
          </section>
    </vue-html2pdf>
  </div>
  
  <v-card
    class="elevation-4"
    shaped
    color="next"
    dark
  >
    <v-card-text>
      <v-row>
        <v-col>
          <div>{{ $t('Customer') }}</div>
          <p class="text-h6">
            {{ CustomerInfo.raison }}
          </p>
          <div>{{ $t('SaleDate') }}</div>
          <p class="text-h6">
            {{ formatDate(SaleInfo.date) }}
          </p>
            </v-col>
          <v-col>
              <div>{{ $t('Taxes') }}</div>
              <p class="text-h6">
                {{ formatNumber(SaleInfo.totalTaxes) }}
              </p>
              <div>{{ $t('UntaxedAmount') }}</div>
              <p class="text-h6">
                {{ formatNumber(SaleInfo.totalUntaxedAmount) }}
              </p>
              
            </v-col>
            <v-col>
          <div>{{ $t('Total') }}</div>
          <p class="text-h6">
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

    <template v-slot:[`footer.page-text`]="items"> 
      {{ items.pageStart }} - {{ items.pageStop }} {{ $t('Of') }} {{ items.itemsLength }} 
    </template>

    <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ header }">
          {{ $t(header.text) }}
    </template>

    <template v-slot:[`item.date`]="{ item }">
      {{ formatDate(item.date) }}
    </template>

    <template v-slot:[`item.subTotal`]="{ item }">
      {{ formatNumber(item.subTotal) }}
    </template>

    <template v-slot:[`item.price`]="{ item }">
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

        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>

        <v-btn
              color="next"
              dark
              icon
              class="mb-2"
              @click="generateReport"
            >
              <v-icon large>
                mdi-printer
              </v-icon>
            </v-btn>

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
                      item-value="productId"
                      item-text="productId.name"
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
    <template v-slot:[`item.actions`]="{ item }">
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
  import moment from 'moment';
  import VueHtml2pdf from 'vue-html2pdf';
  
  export default {
    components: {
        VueHtml2pdf
    },
    data: () => ({
      id: '',
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Products',
          align: 'start',
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
      companyInfo: [],
      tax_value: '',
      untaxed_value: '',
      sub_total: '',
      ancienAmount: '',
      newAmount: '',
      pdfHeaders: [],
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
      generateReport () {
          this.$refs.html2Pdf.generatePdf()
      },
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

      loadStockProducts() {
        ipcRenderer.send('stocks:load'),
        ipcRenderer.on('stocks:get', (e, products) => {
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

      loadCompany() {
        ipcRenderer.send('companies:load'),
        ipcRenderer.on('company:get', (e, companies) => {
        companies = JSON.parse(companies)
        this.companyInfo = companies[0]
      })
      },
      
      initialize () {
        this.loadProductSales()
        this.loadStockProducts()
        this.loadSaleInfo()
        this.loadTaxes()
        this.loadCompany()
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

      updateTotals (item) {
        // get tax value 
        let result 
        if (this.editedIndex > -1) {
            result = this.taxes.find(i => i._id == item.taxId._id).valueTax;
          } else {
            result = this.taxes.find(i => i._id == item.taxId).valueTax;
          }
        // calculate untaxed value
        this.untaxed_value = item.amount * item.price
        //calculate the defrence 
        let deffTotal;
        let tax_value;
        let subTotal;
          if ( this.untaxed_value == item.untaxedAmount ) {
            deffTotal = 0;
            ipcRenderer.send('productSales:edit', item)
          } else if ( this.untaxed_value > item.untaxedAmount ) {
            //calculate the defrence betwen the new and the old untaxed value
            deffTotal = this.untaxed_value - item.untaxedAmount

            //calculate tax value for the defrence
            tax_value = deffTotal * ( result / 100 )
            subTotal = deffTotal + tax_value

            //update totals value
            item.subTotal = item.subTotal + subTotal
            this.SaleInfo.totalPrice = this.SaleInfo.totalPrice + subTotal
            this.SaleInfo.totalUntaxedAmount = this.SaleInfo.totalUntaxedAmount + deffTotal
            this.SaleInfo.totalTaxes = this.SaleInfo.totalTaxes + tax_value

            //
            ipcRenderer.send('saleTotals:edit', this.SaleInfo)
            item.untaxedAmount = this.untaxed_value
            ipcRenderer.send('productSales:edit', item)

          } else if ( this.untaxed_value < item.untaxedAmount ) {
            deffTotal = item.untaxedAmount - this.untaxed_value
            
            //calculate tax value for the defrence
            tax_value = deffTotal * ( result / 100 )
            subTotal = deffTotal + tax_value

            //update totals value
            item.subTotal = item.subTotal - subTotal
            this.SaleInfo.totalPrice = this.SaleInfo.totalPrice - subTotal
            this.SaleInfo.totalUntaxedAmount = this.SaleInfo.totalUntaxedAmount - deffTotal
            this.SaleInfo.totalTaxes = this.SaleInfo.totalTaxes - tax_value

            ipcRenderer.send('saleTotals:edit', this.SaleInfo)
            item.untaxedAmount = this.untaxed_value
            ipcRenderer.send('productSales:edit', item)
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
          this.updateTotals(this.editedItem)
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

  .v-data-table {
    border: 1px solid black;
  }

  ::v-deep .v-data-table-header {
    background-color: #00366f; 
  } 

  ::v-deep table > thead > tr:last-child > th {
    color: white !important;
  }

  /* ::v-deep tr:nth-child(even) {background-color: #f2f2f2;} */

  ::v-deep table > thead > tr:last-child > th .v-icon__svg {
    color: #ffffff !important;
  }

  .pdf-table {
    background-color: #f2f2f2;
  }

  .pdf-style {
    color: black !important;
  }

</style>
