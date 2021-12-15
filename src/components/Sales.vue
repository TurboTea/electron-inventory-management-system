<template>
<v-container fluid>
  <v-expansion-panels popout>
        <v-expansion-panel
          hide-actions
        >
          <v-expansion-panel-header>
               
                <h2>Filter</h2>
              
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
              label="Date Début"
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
              label="Date Fin"
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
    :items="sales"
    :search="search"
    sort-by="code"
    class="elevation-4 mt-4"
    @click:row="routerClick($event)"
  >
    <template v-slot:item.date="{ item }">
      {{ formatDate(item.date) }}
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Ventes</v-toolbar-title>
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
        <!-- <v-dialog
          v-model="dialog"
          max-width="500px"
        > -->
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="next"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template> -->
          
          <!-- <v-card>
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
                      :items="customers"
                      label="Customers"
                      item-value="_id"
                      item-text="raison"
                      v-model="editedItem.customer"
                     
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
          </v-card> -->
        <!-- </v-dialog> -->
        <!-- <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="next" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="next" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </v-toolbar>
    </template>
    <!-- <template v-slot:item.actions="{ item }"> -->
      <!-- <v-icon
        small
        class="mr-2"
        color="next"
      >
        mdi-eye
      </v-icon> -->
      <!-- <v-icon
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
      </v-icon> -->
    <!-- </template> -->
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
        { text: 'Customer', value: "customerId.raison" },
        { text: 'Total', value: 'total_price' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      sales: [],
      customers: [],
      editedIndex: -1,
      editedItem: {
        code: '',
        customer: '',
        total_price: ''
      },
      defaultItem: {
        code: '',
        customer: '',
        total_price: ''
      },
    }),

    computed: {
      computedDateFormattedStartDate () {
        return this.date_start ? moment(this.date_start).format('dddd, MMMM Do YYYY') : ''
      },
      computedDateFormattedEndDate () {
        return this.date_end ? moment(this.date_end).format('dddd, MMMM Do YYYY') : ''
      },
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
      this.initialize()
    },

    methods: {
      routerClick(e) {
        
        this.$router.push({ path: `/sale/${e._id}`  });
      },
      formatDate(value) {
        return moment(value).format("MMMM DD YYYY, h:mm:ss a")
      },
      initialize () {
        ipcRenderer.send('sales:load'),
        ipcRenderer.on('sales:get', (e, sales) => {
          this.sales = JSON.parse(sales)
        }),
        ipcRenderer.send('customers:load'),
        ipcRenderer.on('customers:get', (e, customers) => {
          this.customers = JSON.parse(customers)
        })
      },

      editItem (item) {
        this.editedIndex = this.sales.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item._id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        ipcRenderer.send('sales:delete', this.editedIndex)
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
          ipcRenderer.send('sales:edit', this.editedItem)
        } else {
          var str = String(this.sales.length++);
          while (str.length < 5) str = "0" + str;
          
          let item = {
          code: "S" + str,
          customerId: this.editedItem.customer,
          total_price: this.editedItem.total_price,
          
        }
        ipcRenderer.send('sales:add', item)
        //ipcRenderer.send('stocks:add', item)
        }
        this.close()
      },
    },
  }
</script>

