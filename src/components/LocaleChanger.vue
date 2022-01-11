<template>
  <div class="LocaleChanger">
    <v-menu transition="slide-y-transition" bottom>
      <template v-slot:activator="{ on }">
        <div v-on="on" class="current">
          <img :src="require(`../assets/flags/${langs[current]}.png`)" :alt="langs[current]">
        </div>
      </template>
      <v-list class="LocaleChangerMenu">
        <v-list-item v-for="(lang, i) in langs" :key="i" @click="changeLang(lang, i)">
          <v-list-item-content>
            <v-img :src="require(`../assets/flags/${langs[i]}.png`)" :alt="lang" />
            <span>{{ lang }}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { languages } from '../lang'

export default {
  name: 'LocaleChanger',
  data () {
    return {
      langs: languages,
      current: 0,
    }
  },
  methods: {
    changeRTL () {
        this.$vuetify.rtl = true
        this.$vuetify.ltr = false
      },
      changeLTR () {
        this.$vuetify.ltr = true
        this.$vuetify.rtl = false
      },
    changeLang(lang, i) {
      this.$i18n.locale = lang
      this.$vuetify.lang.current = lang
      this.current = i
      if (this.$i18n.locale == 'ar') {
        this.changeRTL ()
      }else {
        this.changeLTR ()
      }
    }
  },
  created() {
    this.current = this.langs.findIndex(e => e == this.$i18n.locale)
    if (this.current == -1) this.current = 0
  },
}
</script>

<style lang="scss">
.LocaleChanger {
  .current {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  img {
    height: 35px;
  }
}
.LocaleChangerMenu .v-list-item__content {
    justify-content: space-between;
    padding: 6px 0;
    text-transform: uppercase;
    font-size: 10px;
    width: 60px;
    height: 60px;
    color: #888888;
    & > * {
      line-height: initial;
      flex: initial;
    }
    span {
      margin-left: 10px;
    }
  }
</style>