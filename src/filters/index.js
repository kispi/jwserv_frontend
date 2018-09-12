import { store as $store } from '@/store'
import Vue from 'vue'

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

export const textToHTML = (text) => {
    if (text) {
        return text.replace(/\n/g, "<br>");
    }
}

export const toCamel = (snake) => {
    if (snake) {
        snake = snake.toLowerCase();
        var result = "";
        var underbarPassed = false;
        snake.split("").forEach(c => {
            if (c !== "_") {
                result += (underbarPassed ? c.toUpperCase() : c);
            }
            underbarPassed = c === "_"
        })
        return result;
    }
}

export const toSnake = (camel) => {
    let uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    if (camel) {
        var result = "";
        camel.split("").forEach(c => {
            result += (uppers.indexOf(c) >= 0 ? "_" + c.toLowerCase() : c);
        })
        return result;
    }
}

export const formatDate = (value, format) => {
    if (value) {
        return Vue.prototype.$moment(String(value)).format(format || "YYYY-MM-DD hh:mm:ss");
    }
}