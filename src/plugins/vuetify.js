import Vue from 'vue';
import Vuetify from 'vuetify/lib'
// import Vuetify from 'vuetify/lib/framework';

const locales = {
  en: require('vuetify/es5/locale/en'),
  fr: require('vuetify/es5/locale/fr'),
  ar: require('vuetify/es5/locale/ar')
}

const current = navigator.language.split('-')[0]

Vue.use(Vuetify);

export default new Vuetify({
  locales,
  current,
  icons: {
    iconfont: 'mdiSvg'
  },
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#007BFF',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        next: '#00366f'
      },
    },
  },
});
