<template>
  <v-container fluid>
    <v-card 
      style="border: 1px"
    >
      <v-card-title>
        <v-row>
          <v-col>
             <h1>Fiche Technique</h1>
          </v-col>
        </v-row>
      </v-card-title>
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
                          v-model="productInfo.name"
                          :label="$t('Name')"
                          outlined
                          dense
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                            v-model="productInfo.code"
                            :label="$t('Code')"
                            outlined
                            dense
                          ></v-text-field>
                    </v-col>
                  </v-row>
                

                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="productInfo.designation"
                        :label="$t('Description')"
                        outlined
                        dense
                        rows="8"
                      ></v-textarea>

                    </v-col> 

                    <v-col>
                      <v-text-field
                        v-model="productInfo.costPrice"
                        :label="$t('BuyingPrice')"
                        type="number"
                        outlined
                        dense
                      ></v-text-field>

                      <v-text-field
                        v-model="productInfo.salePrice"
                        :label="$t('SellingPrice')"
                        type="number"
                        outlined
                        dense
                      ></v-text-field>

                      <v-text-field
                        v-model="productInfo.alertQuantity"
                        :label="$t('AlertQuantity')"
                        type="number"
                        outlined
                        dense
                      ></v-text-field>

                      <v-row>
                        <v-col>
                          <v-select
                            :items="families"
                            :label="$t('Families')"
                            item-value="_id"
                            item-text="name"
                            v-model="productInfo.familyId"
                            outlined
                            dense
                          ></v-select>
                        </v-col>

                        <v-col>
                          <v-select
                            :items="units"
                            :label="$t('UnitOfMeasure')"
                            item-value="_id"
                            item-text="name"
                            v-model="productInfo.unitId"
                            outlined
                            dense
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-col> 
                  </v-row>

                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-checkbox
                        v-model="productInfo.durability"
                        :label="$t('Durability')"
                        dense
                      ></v-checkbox>
                    </v-col>

                    <v-col>
                      <v-menu
                        v-model="date_expiration"
                        :close-on-content-click="false"
                        max-width="290"
                        v-if="productInfo.durability"
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
                            @click:clear="productInfo.expirationDate = null"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="productInfo.expirationDate"
                          @change="date_expiration = false"
                        ></v-date-picker>
                      </v-menu>
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
                          :src="productInfo.imageUrl"
                          contain
                          width="100%"
                          style="float: center; border: 1px solid;"
                          alt="Product Image"
                        >
                        <v-file-input 
                          v-model="image" 
                          type="file" 
                          :label="$t('Photo')" 
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
  </v-container>
</template>

<script>
    import {ipcRenderer} from "electron";
    import moment from 'moment';

    export default {
        data: () => ({
            id: '',
            productInfo: [],
            image: undefined,
            families: [],
            units: [],
            date_expiration: '',
        }),

        computed: {
            computedDateFormattedExpirationDate () {
                return this.productInfo.expirationDate ? moment(this.productInfo.expirationDate).format('dddd, MMMM Do YYYY, h:mm:ss a') : ''
            },
        },

        created() {
            this.getRouteId()
        },

        methods: {

            formatDate(value) {
                return moment(value).locale(this.$i18n.locale).format("MMMM DD YYYY")
            },
            
            getRouteId() {
                this.id = this.$route.params.id,
                this.initialize() 
            },

            loadProduct () {
                ipcRenderer.send('productInfo:load', this.id),
                ipcRenderer.on('productInfo:get', (e, productInfo) => {
                this.productInfo = JSON.parse(productInfo)
                })
            },

            loadFamilies () {
                ipcRenderer.send('families:load'),
                ipcRenderer.on('families:get', (e, families) => {
                this.families = JSON.parse(families)
                })
            },

            loadUnits () {
                ipcRenderer.send('units:load'),
                ipcRenderer.on('units:get', (e, units) => {
                this.units = JSON.parse(units)
                })
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
                this.loadProduct(),
                this.loadFamilies(),
                this.loadUnits()
            },

            close () {
              this.$router.push({ path: `/products`  });
            },

            save () {
              ipcRenderer.send('products:edit', this.productInfo)
              this.$router.push({ path: `/products`  });
            }
            
        }
        
    }
</script>

<style scoped>

   
</style>