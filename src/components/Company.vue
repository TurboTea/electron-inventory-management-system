<template>
<v-container fluid>
  <v-card 
      style="border: 1px"
    >
     
      <v-divider
        class="mx-4"
        inset
        >
      </v-divider>
            <v-card-text>
              <v-row>

                <v-col>
                  <v-row>  
                    <v-col>
                      <v-text-field
                          v-model="companyInfo.companyName"
                          :label="$t('Name')"
                          outlined
                          dense
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                          v-model="companyInfo.country"
                          :label="$t('Country')"
                          outlined
                          dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="companyInfo.city"
                        :label="$t('City')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col> 

                    <v-col>
                      <v-text-field
                          v-model="companyInfo.phone"
                          :label="$t('Phone')"
                          outlined
                          dense
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                          v-model="companyInfo.taxIdentifierNumber"
                          :label="$t('NIF')"
                          outlined
                          dense
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                          v-model="companyInfo.statisticalIdentifierNumber"
                          :label="$t('NIS')"
                          outlined
                          dense
                          ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="companyInfo.street"
                        :label="$t('Street')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="companyInfo.zip"
                        :label="$t('ZIP')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="companyInfo.commercialRegisterNumber"
                        :label="$t('RC')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="companyInfo.mobile"
                        :label="$t('Mobile')"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>

                  </v-row>
                </v-col>

                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>

                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >        
                    <v-hover v-slot="{ hover }">
                      <v-img 
                              :src="companyInfo.logo"
                              contain
                              width="100%"
                              style="float: center; border: 1px solid;"
                              alt="Company Logo"
                            >
                            <v-file-input 
                              v-model="image" 
                              type="file" 
                              :label="$t('Logo')" 
                              hide-input
                              outlined
                              dense 
                              v-if="hover"
                              @change="onFileChange" 
                            />
                            
                    </v-img> 
                    </v-hover>
                </v-col>

              </v-row>
                  
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
                {{ $t('Edit') }}
              </v-btn>
            </v-card-actions>
          </v-card>
 
  <!-- <v-data-table
    :headers="headers"
    :items="companies"
    sort-by="name"
    class="elevation-4"
    :footer-props="{
        'items-per-page-text': $t('RowsPerPage'),           
    }"
  >
    <template v-slot:footer.page-text="items"> 
      {{ items.pageStart }} - {{ items.pageStop }} {{ $t('Of') }} {{ items.itemsLength }} 
    </template>
    
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
                        v-model="editedItem.companyName"
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
                    <v-row>
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
                    :src="editedItem.logo"
                    contain
                    width="100%"
                    style="border: 1px dashed #ccc; min-height: 530px" 
                    />
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
  </v-data-table> -->
</v-container>
</template>

<script>
import {ipcRenderer} from "electron";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      image: undefined,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'companyName',
        },
        { text: 'NIS', value: 'statisticalIdentifierNumber'},
        { text: 'NIF', value: 'taxIdentifierNumber'},
        { text: 'RC', value: 'commercialRegisterNumber'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      companies: [],
      companyInfo: [],
      editedIndex: -1,
      editedItem: {
        companyName: '',
        city: '',
        street: '',
        state: '',
        zip: '',
        country: '',
        phone: '',
        mobile: '',
        logo: '',
        // currency: '',
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
        // currency: '',
        statisticalIdentifierNumber: '',
        taxIdentifierNumber: '',
        commercialRegisterNumber: ''
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

    created () {
      this.initialize()
    },

    methods: {
      createImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.companyInfo.logo = e.target.result;
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
          ipcRenderer.send('companies:load'),
          ipcRenderer.on('company:get', (e, companies) => {
          this.companies = JSON.parse(companies)
          this.companyInfo = this.companies[0]
          
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
        ipcRenderer.send('companies:edit', this.companyInfo)

      },
    },
  }
</script>

<style scoped>
 
 
</style>