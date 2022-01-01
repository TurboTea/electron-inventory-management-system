<template>
<v-container fluid>
 

  <v-data-table
    :headers="headers"
    :items="companies"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Company</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="900px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="next"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-plus-circle
              </v-icon>
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
                        <v-text-field
                        v-model="editedItem.companiesName"
                        label="Raison Social"
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
                        v-model="editedItem.city"
                        label="Ville"
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
                        v-model="editedItem.street"
                        label="Rue"
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
                        v-model="editedItem.zip"
                        label="code postal"
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
                        v-model="editedItem.country"
                        label="Pays"
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
                        v-model="editedItem.phone"
                        label=" téléphone"
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
                        v-model="editedItem.mobile"
                        label="Mobile"
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
                        v-model="editedItem.currency"
                        label="Devise"
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
                        v-model="editedItem.statisticalIdentifierNumber"
                        label="NIS N°"
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
                        v-model="editedItem.taxIdentifierNumber"
                        label="NIF N°"
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
                        v-model="editedItem.commercialRegisterNumber"
                        label="RC N°"
                        outlined
                        dense
                        ></v-text-field>
                    </v-col> 
                        
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
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
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      companies: [],
      editedIndex: -1,
      editedItem: {
        companiesName: '',
        city: '',
        street: '',
        state: '',
        zip: '',
        country: '',
        phone: '',
        mobile: '',
        logo: '',
        currency: '',
        statisticalIdentifierNumber: '',
        taxIdentifierNumber: '',
        commercialRegisterNumber: ''
      },
      defaultItem: {
        companiesName: '',
        city: '',
        street: '',
        state: '',
        zip: '',
        country: '',
        phone: '',
        mobile: '',
        logo: '',
        currency: '',
        statisticalIdentifierNumber: '',
        taxIdentifierNumber: '',
        commercialRegisterNumber: ''
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

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
          ipcRenderer.send('companies:load'),
          ipcRenderer.on('companies:get', (e, companies) => {
          this.companies = JSON.parse(companies)
          console.log('companies', this.companies)
        })
      },

      editItem (item) {
        this.editedIndex = this.companies.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item._id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        ipcRenderer.send('companies:delete', this.editedIndex)
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
          ipcRenderer.send('companies:edit', this.editedItem)
        } else {
          ipcRenderer.send('companies:add', this.editedItem)
        }
        this.close()
      },
    },
  }
</script>