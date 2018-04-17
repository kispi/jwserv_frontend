import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
    state: {
        translation: {
            locale: window.localStorage.getItem("locale") || "en",
            texts: {
                JWSERV: {
                    en: "JWServ",
                    kr: "JWServ"
                },
                WELCOME: {
                    en: "Welcome!",
                    kr: "환영합니다!"
                },
                SIGNUP: {
                    en: "Sign Up",
                    kr: "회원 가입"
                },
                CREATE_ACCOUNT: {
                    en: "Create Account",
                    kr: "계정 생성"
                },
                LOGIN: {
                    en: "Login",
                    kr: "로그인"
                },
                EMAIL: {
                    en: "Email",
                    kr: "이메일"
                },
                PASSWORD: {
                    en: "Password",
                    kr: "비밀번호"
                }
            }
        }
    },
    getters,
    mutations,
    actions
};