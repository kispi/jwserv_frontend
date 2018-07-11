import { store as $store } from '@/store'

export const translate = (key) => {
    var locale = $store.getters.translation.locale;
    var supportedLocales = ['kr', 'en']
    if (supportedLocales.indexOf(locale) === -1) {
        locale = 'kr';
        $store.dispatch("setLocale", locale);
    }

    return ($store.getters.translation.texts[key] || {})[locale] || key;
}