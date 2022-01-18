<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :search="search"
    sort-by="code"
    class="elevation-4"
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

    <template v-slot:[`item.durability`]="{ item }">
      <div v-if="item.durability == true">
        <v-chip
          :color="getColor(item.durability)"
          dark
        >
          {{ formatDate(item.expirationDate) }}
        </v-chip>
      </div>
    </template>

    <template v-slot:[`item.costPrice`]="{ item }">
      {{ formatNumber(item.costPrice) }}
    </template>

    <template v-slot:[`item.salePrice`]="{ item }">
      {{ formatNumber(item.salePrice) }}
    </template>
    <!-- <template v-slot:item.imageUrl="{ item }">
        <v-img :src="item.imageUrl" style="width: 50px; height: 50px"/>
    </template> -->
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{ $t('Products') }}</v-toolbar-title>
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
              @click="generateCode"
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
                    <v-text-field
                      v-model="editedItem.name"
                      :label="$t('Name')"
                      outlined
                      dense
                    ></v-text-field>

                    <v-text-field
                      v-model="editedItem.code"
                      :label="$t('Code')"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="8"
                  >
                    <v-textarea
                      v-model="editedItem.designation"
                      :label="$t('Description')"
                      outlined
                      dense
                      rows="4"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    
                  
                      
                  </v-col>
                  <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    >
                    
                      <v-file-input 
                        v-model="image" 
                        type="file" 
                        :label="$t('Photo')" 
                        
                        outlined
                        dense 
                        @change="onFileChange" 
                      />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  
                  >
                      <v-img 
                      :src="editedItem.imageUrl"
                      contain
                      width="300px"
                      style="border: 1px dashed #ccc; min-height: 300px" 
                      />
                    
                  </v-col>
                  </v-row>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.costPrice"
                      :label="$t('BuyingPrice')"
                      type="number"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.salePrice"
                      :label="$t('SellingPrice')"
                      type="number"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.alertQuantity"
                      :label="$t('AlertQuantity')"
                      type="number"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <!-- <v-row 
                      style="margin: 0"
                    > -->
                      <v-select
                        :items="families"
                        :label="$t('Families')"
                        item-value="_id"
                        item-text="name"
                        v-model="editedItem.familyId"
                        outlined
                        dense
                      ></v-select>

                      <!-- <v-btn
                        text
                        icon
                        color="next"
                        to="/setting"
                      >
                        <v-icon>
                          mdi-open-in-new
                        </v-icon>
                      </v-btn> -->
                    <!-- </v-row> -->
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <!-- <v-row 
                      style="margin: 0"
                    > -->
                        <v-select
                          :items="units"
                          :label="$t('UnitOfMeasure')"
                          item-value="_id"
                          item-text="name"
                          v-model="editedItem.unitId"
                          outlined
                          dense
                        ></v-select>

                        <!-- <v-btn
                          text
                          icon
                          color="next"
                          to="/setting"
                        >
                        <v-icon>
                          mdi-open-in-new
                        </v-icon>
                      </v-btn> -->
                    <!-- </v-row> -->
                    
                  </v-col>
                
              
                </v-row>
                  <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-checkbox
                      v-model="editedItem.durability"
                      :label="$t('Durability')"
                      dense
                    ></v-checkbox>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="8"
                  >
                    <v-menu
                      v-model="date_expiration"
                      :close-on-content-click="false"
                      max-width="290"
                      v-if="editedItem.durability"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="computedDateFormattedExpirationDate"
                          append-icon="mdi-calendar"
                          clearable
                          :label="$t('ExpirationDate')"
                          readonly
                          outlined
                          dense
                          v-bind="attrs"
                          v-on="on"
                          @click:clear="editedItem.expirationDate = null"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.expirationDate"
                        @change="date_expiration = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  </v-row>
                  <!-- <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    >
                    <v-file-input 
                      v-model="image" 
                      type="file" 
                      :label="$t('Photo')" 
                      
                      outlined
                      dense 
                      @change="onFileChange" 
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="8"
                    >
                    <v-img 
                    :src="editedItem.imageUrl"
                    contain
                    width="100px"
                    style="border: 1px dashed #ccc; min-height: 100px" 
                    />
                  </v-col>
                  </v-row> -->
                 
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
        @click="routerClick(item)"
      >
        mdi-pencil
      </v-icon>
      <!-- <v-icon
        small
        class="mr-2"
        color="primary"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon> -->
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
</template>

<script>
  import {ipcRenderer} from "electron";
  import moment from 'moment';
  // import Qrcode from 'v-qrcode/src/index'

  export default {
    // components: {
    //   Qrcode,
    // },
    data: () => ({
      search: '',
      date_expiration: '',
      dialog: false,
      dialogDelete: false,
      image: undefined,
      headers: [
        {
          text: 'Code',
          align: 'start',
          sortable: false,
          value: 'code',
        },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'designation' },
        { text: 'BuyingPrice', value: 'costPrice' },
        { text: 'SellingPrice', value: 'salePrice' },
        { text: 'Families', value: 'familyId.name' },
        { text: 'UnitOfMeasure', value: 'unitId.name' },
        { text: 'Durability', value: 'durability' },
        // { text: 'Photo Produit', value: 'imageUrl' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      products: [],
      families: [],
      units: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        designation: '',
        code: '',
        costPrice: '',
        salePrice: '',
        durability: false,
        qrCode: '',
        alertQuantity: '',
        imageUrl: '',
        expirationDate: '',
        familyId: '',
        unitId: ''
      },
      defaultItem: {
        name: '',
        designation: '',
        code: '',
        costPrice: '',
        salePrice: '',
        durability: false,
        qrCode: '',
        alertQuantity: '',
        imageUrl: '',
        expirationDate: '',
        familyId: '',
        unitId: ''
      },
    }),

    computed: {
      computedDateFormattedExpirationDate () {
        return this.editedItem.expirationDate ? moment(this.editedItem.expirationDate).format('dddd, MMMM Do YYYY, h:mm:ss a') : ''
      },
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
      this.initialize()
    },

    methods: {
      formatDate(value) {
        return moment(value).locale(this.$i18n.locale).format("MMMM DD YYYY")
      },

      formatNumber(value) {
        return new Intl.NumberFormat(this.$i18n.locale, { style: 'currency', currency: 'DZD' }).format(value)
      },

      getColor (valeur) {
        if (valeur == true) return 'orange'
        else return 'green'
      },

      routerClick(e) {
        this.$router.push({ path: `/product/${e._id}`  });
      },

      createImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedItem.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
        },
        onFileChange(file) {
          if (!file) {
            return;
          }
          this.createImage(file);
      },

      initialize () {
        ipcRenderer.send('products:load'),
        ipcRenderer.on('products:get', (e, products) => {
          this.products = JSON.parse(products)
        }),
        ipcRenderer.send('families:load'),
        ipcRenderer.on('families:get', (e, families) => {
          this.families = JSON.parse(families)
        })
        ipcRenderer.send('units:load'),
        ipcRenderer.on('units:get', (e, units) => {
          this.units = JSON.parse(units)
        })
      },

      editItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item._id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        ipcRenderer.send('products:delete', this.editedIndex)
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

      generateCode () {
          var str = String(this.products.length++);
          while (str.length < 5) str = "0" + str;
          this.editedItem.code = "A" + str
      },

      save () {
        if (this.editedIndex > -1) {
          ipcRenderer.send('products:edit', this.editedItem)
        } else {
          ipcRenderer.send('products:add', this.editedItem)
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
  ::v-deep table > thead > tr:last-child > th .v-icon__svg {
    color: #ffffff !important;
  }
  .col {
    padding: 0px !important;
    max-width: 300px;
  }
</style>