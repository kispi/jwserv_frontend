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
                OK: {
                    en: "OK",
                    kr: "확인"
                },
                CONFIRM: {
                    en: "Confirm",
                    kr: "확인"
                },
                CANCEL: {
                    en: "Cancel",
                    kr: "취소"
                },
                STATUS: {
                    en: "Status",
                    kr: "현황보기"
                },
                WRITE: {
                    en: "Write",
                    kr: "기록하기"
                },
                PROFILE: {
                    en: "Profile",
                    kr: "내 정보"
                },
                LOGOUT: {
                    en: "Logout",
                    kr: "로그아웃"
                },
                CREATE_ACCOUNT: {
                    en: "Create Account",
                    kr: "계정 생성"
                },
                ADD_CONGREGATION_TXT: {
                    en: "Type the name of congregation to add.\n\nRole of the first account of the congregation will become 'admin', while accounts after it become 'read'. 'admin' can change the role of accounts.",
                    kr: "등록할 회중의 이름을 적어주십시오.\n\n회중의 첫 계정에는 관리자 권한이 부여됩니다. 동일 회중에 그 이후에 등록된 계정들의 처음 권한은 '열람'이며, 관리자는 이 계정들의 권한을 변경할 수 있습니다."
                },
                ADD_CONGREGATION_PLACEHOLDER: {
                    en: "(EX: 경기성남북부)",
                    kr: "(예: 경기성남북부)"
                },
                CONGREGATION_ALREADY_EXISTS: {
                    en: "Congregation Exists",
                    kr: "회중이 존재합니다"
                },
                CONGREGATION_ALREADY_EXISTS_TXT: {
                    en: "Congregation already exists",
                    kr: "이미 존재하는 회중입니다"
                },
                NON_EXIST_USER: {
                    en: "Non exist user",
                    kr: "존재하지 않는 사용자"
                },
                NON_EXIST_USER_TXT: {
                    en: "The user with given Email doesn't exist",
                    kr: "해당 이메일을 가진 사용자가 존재하지 않습니다"
                },
                INVALID_PASSWORD: {
                    en: "Invalid Password",
                    kr: "잘못된 비밀번호"
                },
                INVALID_PASSWORD_TXT: {
                    en: "Password is incorrect",
                    kr: "비밀번호가 잘못되었습니다"
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
                },
                NAME: {
                    en: "Name",
                    kr: "이름"
                },
                CONGREGATION: {
                    en: "Congregation",
                    kr: "회중"
                },
                PHONE: {
                    en: "Phone",
                    kr: "전화번호"
                },
                ADD_CONGREGATION: {
                    en: "Add Congregation",
                    kr: "회중 추가"
                },
                SELECT_CONGREGATION: {
                    en: "Select Congregation",
                    kr: "회중 선택"
                },
                SIGNUP_REQUIRED: {
                    en: "is required field.",
                    kr: "는 필수 입력 항목입니다."
                },
                SIGNUP_SECURE: {
                    en: "Password is encrypted, so administrator cannot know it.",
                    kr: "비밀번호는 암호화되어 저장되므로 관리자도 알 수 없습니다."
                },
            }
        }
    },
    getters,
    mutations,
    actions
};