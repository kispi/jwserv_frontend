import { store as $store } from '@/store'

export const translate = (key) => {
    const locale = $store.getters.translation.locale;
    return ($store.getters.translation.texts[key] || {})[locale] || key;
}