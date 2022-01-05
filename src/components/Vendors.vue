<template>
  <v-data-table
    :headers="headers"
    :items="vendors"
    sort-by="raison"
    :search="search"
    class="elevation-4"
    :footer-props="{
        'items-per-page-text': $t('RowsPerPage'),           
    }"
  >
    <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ header }">
      {{ $t(header.text) }}
    </template>

    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{ $t('Suppliers') }}</v-toolbar-title>
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
                    <v-text-field
                      v-model="editedItem.raison"
                      :label="$t('RaisonSocial')"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.phone"
                      :label="$t('Phone')"
                    ></v-text-field>
                  </v-col>
                  <!--<v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.user"
                      label="User"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>-->
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
</template>

<script>
  import {ipcRenderer} from "electron";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      headers: [
        {
          text: 'RaisonSocial',
          align: 'start',
          sortable: false,
          value: 'raison',
        },
        { text: 'Phone', value: 'phone' },
        // { text: 'Created', value: 'created' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      vendors: [],
      editedIndex: -1,
      editedItem: {
        raison: '',
        phone: '',
      },
      defaultItem: {
        raison: '',
        phone: '',
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
      this.initialize()
    },

    methods: {
      initialize () {
        ipcRenderer.send('vendors:load'),
        ipcRenderer.on('vendors:get', (e, vendors) => {
          this.vendors = JSON.parse(vendors)
        })
      },

      editItem (item) {
        this.editedIndex = this.vendors.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.vendors.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.vendors.splice(this.editedIndex, 1)
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
        let item = {
          raison: this.editedItem.raison,
          phone: this.editedItem.phone,
        }
        ipcRenderer.send('vendors:add', item),
        this.close()
        /*if (this.editedIndex > -1) {
          Object.assign(this.vendors[this.editedIndex], this.editedItem)
        } else {
          this.vendors.push(this.editedItem)
        }
        this.close()*/
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