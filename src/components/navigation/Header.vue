<template>
    <div class="header" ref="header">
        <div class="nav-bar-controls">
            <div class="pull-left">
                <a class="back" @click="onClickBack()" v-if="showBack"><i class="zmdi zmdi-arrow-left"></i></a>
            </div>
            <div class="pull-right">
                <a class="nav-bar-button mobile-search" v-if="showSearch"></a>
                <a class="nav-bar-button mobile-lang" @click="changeLang()"></a>
                <a class="nav-bar-button mobile-menu" v-if="!showAllMenues"></a>
            </div>
        </div>

        <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
            <ul class="right-side-bar shadow" v-if="showSidebar && !showAllMenues">
                <li v-for="item in menu" :key="item.title" @click="onButton(item)">{{ item.title }}</li>
            </ul>
        </transition>
    </div>
</template>

<script>
export default {
    props: ['currentRoute'],
    name: 'Header',
    data: () => ({
        showSidebar: false,
    }),
    mounted() {
    },
    computed: {
        menu() {
            var menu = [
                {
                    key: "STATUS",
                    route: "service-status"
                }, {
                    key: "WRITE",
                    route: "create-record"
                }, {
                    key: "PROFILE",
                    route: "profile"
                }, {
                    key: "LOGOUT",
                }
            ];
            menu.forEach(m => {
                m.title = this.$options.filters.translate(m.key);
            })
            return menu;
        },
        showAllMenues() {
            return (this.currentRoute.name === "Login") || (this.currentRoute.name === "Signup");
        },
        showSearch() {
            return (this.currentRoute.name === "ServiceStatus")
        },
        showBack() {
            return (this.currentRoute.name !== "Login")
        }
    },
    created() {
        document.addEventListener('click', this.collapse)
    },
    destroyed() {
        document.removeEventListener('click', this.collapse)
    },
    methods: {
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
        }
    }
}
</script>
