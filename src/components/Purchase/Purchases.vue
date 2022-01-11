<template>
<v-container fluid>
  <v-expansion-panels popout>
        <v-expansion-panel
          hide-actions
        >
          <v-expansion-panel-header>
               <v-icon style="justify-content: left;" color="next">mdi-filter</v-icon>
                <!-- <h2>Filter</h2> -->
              
          </v-expansion-panel-header>
            

          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-row justify="center">
      

       <v-col
        cols="4"
      >
        <v-menu
          v-model="start_date"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedStartDate"
              append-icon="mdi-calendar"
              clearable
              :label="$t('StartDate')"
              readonly
              single-line
              v-bind="attrs"
              v-on="on"
              @click:clear="date_start = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date_start"
            @change="start_date = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col
        cols="4"
        
      >
        <v-menu
          v-model="end_date"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedEndDate"
              append-icon="mdi-calendar"
              clearable
              :label="$t('EndDate')"
              readonly
              single-line
              v-bind="attrs"
              v-on="on"
              @click:clear="date_end = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date_end"
            @change="end_date = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
 
  
  <v-data-table
    :headers="headers"
    :items="purchases"
    :search="search"
    sort-by="code"
    class="elevation-4 mt-4"
    :footer-props="{
        'items-per-page-text': $t('RowsPerPage'),           
    }"
  >
    <template v-slot:footer.page-text="items"> 
      {{ items.pageStart }} - {{ items.pageStop }} {{ $t('Of') }} {{ items.itemsLength }} 
    </template>
    
    <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ header }">
      {{ $t(header.text) }}
    </template>

    <template v-slot:item.date="{ item }">
      {{ formatDate(item.date) }}
    </template>
    <template v-slot:item.totalPrice="{ item }">
      {{ formatNumber(item.totalPrice) }}
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{ $t('Purchases') }}</v-toolbar-title>
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
          max-width="900px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="next"
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
                      :items="vendors"
                      :label="$t('Suppliers')"
                      item-value="_id"
                      item-text="raison"
                      v-model="editedItem.vendor"
                     
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
        color="success"
        @click="routerClick(item)"
      >
        mdi-eye
      </v-icon> 
      <!-- <v-icon
        small
        class="mr-2"
        color="next"
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
  </v-container>
</template>

<script>
  import {ipcRenderer} from "electron";
  import moment from 'moment'
  
  export default {
    data: () => ({
      date_start: '',
      date_end: '',
      start_date: false,
      end_date: false,
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Code',
          align: 'start',
          sortable: false,
          value: 'code',
        },
        { text: 'Date', value: "date" },
        { text: 'Suppliers', value: "vendorId.raison" },
        { text: 'Total', value: 'totalPrice' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      purchases: [],
      vendors: [],
      editedIndex: -1,
      editedItem: {
        code: '',
        vendor: '',
        
      },
      defaultItem: {
        code: '',
        vendor: '',
        
      },
    }),

    computed: {
      computedDateFormattedStartDate () {
        return this.date_start ? moment(this.date_start).locale(this.$i18n.locale).format('dddd, MMMM Do YYYY') : ''
      },
      computedDateFormattedEndDate () {
        return this.date_end ? moment(this.date_end).locale(this.$i18n.locale).format('dddd, MMMM Do YYYY') : ''
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
      routerClick(e) {
        this.$router.push({ path: `/purchase/${e._id}`  });
      },
      formatDate(value) {
        return moment(value).locale(this.$i18n.locale).format("MMMM DD YYYY, h:mm:ss a")
      },
      formatNumber(value) {
        return new Intl.NumberFormat(this.$i18n.locale, { style: 'currency', currency: 'DZD' }).format(value)
      },
      initialize () {
        ipcRenderer.send('purchases:load'),
        ipcRenderer.on('purchases:get', (e, purchases) => {
          this.purchases = JSON.parse(purchases)
        }),
        ipcRenderer.send('vendors:load'),
        ipcRenderer.on('vendors:get', (e, vendors) => {
          this.vendors = JSON.parse(vendors)
        })
      },

      editItem (item) {
        this.editedIndex = this.purchases.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item._id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        ipcRenderer.send('purchases:delete', this.editedIndex)
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
        if (this.editedIndex > -1) {
          ipcRenderer.send('purchases:edit', this.editedItem)
        } else {
          var str = String(this.purchases.length++);
          while (str.length < 5) str = "0" + str;
          
          let item = {
          code: "P" + str,
          vendorId: this.editedItem.vendor,
          
        }
        ipcRenderer.send('purchases:add', item)
        //ipcRenderer.send('stocks:add', item)
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