<template>
  <v-container>
     <v-card 
      style="margin: 50px auto;"
      max-width="800"
      class="rounded-card"
      elevation="6"
    >
    <!-- <div id="curved-corner-topleft"></div> -->
      <v-card-title>
        <v-row>
          <v-col>
            <h1 style="margin: auto; text-align: center;">EURL NEXT CHALLENGE</h1>
            
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
                      <h2 style="color: #00366f; margin: auto; text-align: center;">Bureau d'étude et de conseil en informatique</h2>

                      <v-list>
                        <v-list-item
                          v-for="item in items"
                          :key="item.title"
                          link
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
                <v-img           
                  contain
                  src="../assets/icons/logo.png"
                >
                </v-img>
                
              </v-col>



            </v-row>
          </v-card-text>

          <!-- <div id="curved-corner-bottomright"></div> -->
          <!-- <div id="curved-corner-bottomleft"></div> -->
          </v-card>
    
  </v-container>
</template>

<script>

  export default {
    name: 'About',
    data: () => ({
    items: [
          { title: '036 63 93 82', img: require('../assets/icons/couleur/phone.png')},
          { title: '0552 56 96 54', img: require('../assets/icons/couleur/mobile.png')},
          { title: 'contact@nextchallenge-dz.com', img: require('../assets/icons/couleur/email.png')},
          { title: 'https://nextchallenge-dz.com', img: require('../assets/icons/couleur/google.png')},
          { title: 'Eurl next challenge', img: require('../assets/icons/couleur/facebook.png')},
    ]
    })
  }
</script>

<style scoped>
  .rounded-card{
    border-radius:30px;
    color: #00366f;
}
#curved-corner-bottomleft,
#curved-corner-bottomright,
#curved-corner-topleft,
#curved-corner-topright {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
}
#curved-corner-bottomleft:before,
#curved-corner-bottomright:before,
#curved-corner-topleft:before,
#curved-corner-topright:before {
  content: "";
  display: block;
  width: 200%;
  height: 200%;
  position: absolute;
  border-radius: 50%;
}
#curved-corner-bottomleft:before {
  bottom: 0;
  left: 0;
  box-shadow: -50px 50px 0 0 #00366f;
}
#curved-corner-bottomright:before {
  bottom: 0;
  right: 0;
  box-shadow: 50px 50px 0 0 #00366f;
}
#curved-corner-topleft:before {
  top: 0;
  left: 0;
  box-shadow: -50px -50px 0 0 #00366f;
}
#curved-corner-topright:before {
  top: 0;
  right: 0;
  box-shadow: 50px -50px 0 0 red;
}
</style>