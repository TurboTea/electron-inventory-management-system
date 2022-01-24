<template>
  <v-container>
    <v-card 
      class="rounded-card"
      elevation="6"
    >
      <v-card-title>
        <v-row align="center">
          <v-col>
            <v-img 
              src="../assets/icons/logo.png"
              contain
              width="65px"
              :style="[this.$i18n.locale == 'ar' ? {'float': 'left'} : {'float': 'right'}]"
              alt="Logo Eurl Next Challenge"
            >   
            </v-img>
          </v-col>
              
          <v-col
            cols="12"
            sm="6"
            md="8"
          >
            <h1 
              :style="[this.$i18n.locale == 'ar' ? {'float': 'right'} : {'float': 'left'}]"
              class="text-uppercase">{{ $t('CompanyName') }}</h1>
            <br/>
            <h5
            :style="[this.$i18n.locale == 'ar' ? {'float': 'right'} : {'float': 'left'}]"
            >{{ $t('slogan') }}</h5>
          </v-col>
        </v-row>
       
      </v-card-title>

      <v-divider
        class="ma-4"
        inset
      >
      </v-divider>

      <v-card-text>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <h2 style="color: #00366f; margin: auto; text-align: center; text-decoration: underline;">{{ $t('Office') }}</h2>
                <v-list>
                  <v-list-item
                    v-for="contact in contacts"
                    :key="contact.title"      
                  >
                    <v-list-item-avatar>       
                      <v-img
                        left
                        :src="contact.img">
                      </v-img>    
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="font-weight-black">{{ $t(contact.title) }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>     
            </v-row>
          </v-col>

          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

          <v-col>
            <h2 style="color: #00366f; margin: auto; text-align: center; text-decoration: underline;">{{ $t('Services') }}</h2>
            <v-list>
              <v-list-item
                v-for="item in services"
                :key="item.title"  
              >
                <v-list-item-avatar>
                  <v-img
                    left
                    :src="item.img">
                  </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-black">{{ $t(item.title) }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card> 
  </v-container>
</template>

<script>
  export default {
    name: 'About',
    data: () => ({
      contacts: [
            { title: 'Telephone', img: require('../assets/icons/couleur/phone.png')},
            { title: 'Mobile', img: require('../assets/icons/couleur/mobile.png')},
            { title: 'Contact', img: require('../assets/icons/couleur/email.png')},
            { title: 'Site', img: require('../assets/icons/couleur/google.png')},
            { title: 'CompanyName', img: require('../assets/icons/couleur/facebook.png')},
      ],
      services: [
            { title: 'web', img: require('../assets/icons/couleur/ruby.png')},
            { title: 'ecommerce', img: require('../assets/icons/couleur/nodejs.png')},
            { title: 'erp', img: require('../assets/icons/couleur/python.png')},
            { title: 'mobileDev', img: require('../assets/icons/couleur/android.png')},
            { title: 'design', img: require('../assets/icons/couleur/experience.png')},
            { title: 'support', img: require('../assets/icons/couleur/gnu-bash.png')},
      ]
    })
  }
</script>

<style scoped>
  .rounded-card {
    border-radius:30px;
    color: #00366f;
    margin: 50px auto;
  }
</style>