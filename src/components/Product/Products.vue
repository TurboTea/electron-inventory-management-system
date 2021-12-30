<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :search="search"
    sort-by="name"
    class="elevation-4"
  >
    <template v-slot:item.imageUrl="{ item }">
        <v-img :src="item.imageUrl" style="width: 50px; height: 50px"/>
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Produits</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Recherche"
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
                      v-model="editedItem.name"
                      label="Nom Produit"
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
                      v-model="editedItem.designation"
                      label="Description Produit"
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
                      v-model="editedItem.code"
                      label="Code Produit"
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
                      v-model="editedItem.price"
                      label="Prix Produit"
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
                    md="4"
                    >
                    <v-file-input 
                      v-model="image" 
                      type="file" 
                      label="Photo Produit" 
                      hint="Add a picture of youre product" 
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
                    style="border: 1px dashed #ccc; min-height: 250px" 
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
                Cancel
              </v-btn>
              <v-btn
                color="success"
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
        color="success"
        @click="routerClick($event)"
      >
        mdi-eye
      </v-icon>
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
</template>

<script>
  import {ipcRenderer} from "electron";

  export default {
    data: () => ({
      search: '',
      dialog: false,
      dialogDelete: false,
      imgPreview: '',
      image: undefined,
      headers: [
        {
          text: 'Nom Produit',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Description Produit', value: 'designation' },
        { text: 'Code Produit', value: 'code' },
        { text: 'Prix Produit', value: 'price' },
        { text: 'Photo Produit', value: 'imageUrl' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      products: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        designation: '',
        code: '',
        price: '',
        imageUrl: ''
        
      },
      defaultItem: {
        name: '',
        designation: '',
        code: '',
        price: '',
        imageUrl: ''
        
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nouveau' : 'Modifier'
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
  .col {
    padding: 0px !important;
    max-width: 300px;
  }
  /* .col {
    padding: 0px;
    padding-bottom: 0px;
    padding-top: 12px;
  } */
</style>