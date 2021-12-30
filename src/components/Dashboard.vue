<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                >
                    <v-list-item three-line>
                        <v-list-item-icon>
                            <v-icon color="next" large>mdi-cart</v-icon>
                        </v-list-item-icon>
                    <v-list-item-content>
                        <div class="text-overline mb-4">
                        Total incom
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                        10 000 DZD
                        </v-list-item-title>
                        <v-list-item-subtitle>Saved 25%</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col>
                <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                    shaped
                >
                    <v-list-item three-line>
                        <v-list-item-icon>
                         <v-icon color="next" large>mdi-warehouse</v-icon>
                        </v-list-item-icon>
                    <v-list-item-content>
                        <div class="text-overline mb-4">
                        Total incom
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                        10 000 DZD
                        </v-list-item-title>
                        <v-list-item-subtitle>Saved 25%</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col>
                <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                    shaped
                    color=" warning"
                    dark
                >
                    <v-list-item three-line>
                        <v-list-item-avatar>
                         <v-img
                            left
                            src="../assets/icons/point-of-sale.png"
                            >
                        </v-img>
                        </v-list-item-avatar>
                    <v-list-item-content>
                        <div class="text-overline mb-4">
                        Total incom
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                        10 000 DZD
                        </v-list-item-title>
                        <v-list-item-subtitle>Saved 25%</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            
        </v-row>
    </v-container>
</template>

<script>
export default {
    
}
</script>
<style scoped>
.col {
    padding: 5px;
  }
</style>