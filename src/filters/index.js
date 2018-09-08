import { store as $store } from '@/store'

export const translate = (key, temporaryLocale) => {
    var locale = $store.getters.translation.locale;
    var supportedLocales = ['kr', 'en']
    if (supportedLocales.indexOf(locale) === -1) {
        locale = 'kr';
        $store.dispatch("setLocale", locale);
    }

    if (temporaryLocale) {
        locale = temporaryLocale;
    }
    return ($store.getters.translation.texts[key] || {})[locale] || key;
}