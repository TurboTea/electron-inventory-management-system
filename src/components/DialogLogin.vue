<template>
    <v-dialog v-model="!this.$store.state.auth_login" persistent max-width="900px">
        <v-card>
            <v-card-title></v-card-title>
            <v-card-text>
                <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6" 
                    >
                        <v-img 
                            src="../assets/icons/couleur/stock.png"
                            contain
                            width="100%"
                            alt="Next Challenge"
                        />
                    </v-col>
                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <v-col>
                        <v-card-title>{{ $t('AccountLogin') }}</v-card-title>
                            <v-form v-model="valid">
                                <v-container grid-list-md>
                                    <v-text-field 
                                        :label="$t('username')" 
                                        filled 
                                        v-model="username"
                                        :rules="nameRules"
                                        :counter="30"
                                        required 
                                    ></v-text-field>
                                    <v-text-field 
                                        :label="$t('Password')" 
                                        filled 
                                        type="password" 
                                        v-model="password" 
                                        :rules="passwordRules"
                                        :counter="8"
                                        required
                                    ></v-text-field>
                                    <v-checkbox v-model="remeber_login" :label="$t('RemeberMyLoginOnThisComputer')"></v-checkbox>
                                </v-container>
                            </v-form>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    color="next" 
                                    dark
                                    :disabled="this.valid == false"
                                    block 
                                    @click="auth_login">
                                        {{ $t('Login') }}
                                </v-btn>
                            </v-card-actions>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "DialogLogin",
        data () {
            return {
                username: '',
                password: '',
                remeber_login: false,
                valid: false,
                nameRules: [
                    v => !!v || this.$t('NameIsRequired'),
                    v => v.length <= 30 || this.$t('NameMustBeLessThan30Characters'),
                ],
                passwordRules: [
                    v => !!v || this.$t('PasswordIsRequired'),
                    v => v.length >= 8 || this.$t('PasswordMustBeMoreThan8Characters'),
                ],
            }
        },
        methods: {
            auth_login () {
                this.$store.commit('account_sign_in', {
                    username: this.username,
                    password: this.password,
                    remeber_login: this.remeber_login
                })
                this.username = '';
                this.password = '';
                this.remeber_login = false;
            }
        }
    }
</script>