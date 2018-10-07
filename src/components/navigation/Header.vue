<template>
    <div class="header" ref="header">
        <div class="nav-bar-controls">
            <div class="pull-left">
                <a class="back text-uppercase" @click="onClickBack()" v-if="showBack">
                    <i class="zmdi zmdi-arrow-left"></i>
                    <span class="title">{{ routeTitle(current.path) | translate }}</span>
                </a>
            </div>
            <div class="pull-right">
                <a class="nav-bar-button mobile-lang" @click="changeLang()"></a>
                <a class="nav-bar-button mobile-menu" v-if="!showAllMenues"></a>
            </div>
        </div>

        <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
            <ul class="right-side-bar shadow" v-show="showSidebar && !showAllMenues">
                <li
                    v-for="item in menu"
                    :key="item.title"
                    :class="{ 'selected': (current.path && current.path.includes(item.route)) }"
                    @click="onButton(item)">{{ item.title }}
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
export default {
    props: ['currentRoute'],
    name: 'Header',
    data: () => ({
        current: {},
        showSidebar: false,
    }),
    mounted() {
        if (["Login", "Signup"].indexOf(this.currentRoute.name) === -1) {
            this.init();
        }
    },
    watch: {
        $route (to, from) {
            if (to.path) {
                this.current = to;
            }
            if (this.user && !this.user.role) {
                this.$store.dispatch('getMe');
            }
        }
    },
    computed: {
        menu() {
            var menu = [{
                    key: "STATUS",
                    route: "service-status"
                }, {
                    key: "WRITE",
                    route: "create-record"
                }, {
                    key: "PROFILE",
                    route: "profile"
                }];
            if (this.user && this.user.role === "admin") {
                menu.push({
                    key: "USERS",
                    route: "users"
                })    
            }
            menu.push({
                key: "LOGOUT"
            });
            menu.forEach(m => {
                m.title = this.$options.filters.translate(m.key);
            })
            return menu;
        },
        showAllMenues() {
            return (this.currentRoute.name === "Login") || (this.currentRoute.name === "Signup");
        },
        showBack() {
            return (this.currentRoute.name !== "Login")
        },
        user() {
            return this.$store.getters.user;
        }
    },
    created() {
        document.addEventListener('click', this.collapse);
        this.$bus.$on("onLogin", this.init);
    },
    destroyed() {
        document.removeEventListener('click', this.collapse)
    },
    methods: {
        async init() {
            try {
                await this.$store.dispatch("loadAuthToken");
            } catch (err) {
                await this.$store.dispatch("clearAuthToken");
                this.$router.push("login");
            }
            if (!this.user || (this.user && !this.user.role)) {
                await this.$store.dispatch('getMe');
            }
        },
        routeTitle(path) {
            if (!path) {
                return;
            }
            let keys = this.menu.map(m => {
                return m.route;
            })
            return (this.menu[keys.indexOf(path.substring(1))] || []).key;
        },
        collapse(e) {
            if (e.target.className === 'nav-bar-button mobile-menu') {
                this.showSidebar = !this.showSidebar;
                return;
            }

            this.showSidebar = [
                'nav-bar-button mobile-menu',
            ].some(c => {
                return c === e.target.className;
            })
        },
        changeLang() {
            this.$store.dispatch("loadLocale");
            var locale = this.$store.getters.translation.locale;
            if (locale) {
                locale = (locale === "kr" ? "en" : "kr");
            }
            this.$store.dispatch("setLocale", locale);
            this.$toast.success("LANG_CHANGED");
        },
        onClickBack() {
            this.$router.go(-1);
        },
        logout() {
            this.$store.dispatch('clearAuthToken');
            this.$router.push("/login");
        },
        onButton(item) {
            this.showSidebar = false;
            if (item.key === "LOGOUT") {
                this.logout();
            } else {
                this.$router.push("/" + item.route);
            }
        },
    }
}
</script>
