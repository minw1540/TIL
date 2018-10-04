import _axios from 'axios';

const _apiUrl = process.env.VUE_APP_API_URL;

const loginData = {
    userId : '',
    userPwd : '',
};

export default {
    name : 'Login',
    data () {
        return loginData;
    },
    methods : {
        login() {

            let userId = this.userId.trim();
            let userPwd = this.userPwd.trim();

            if(userId === ''){
                alert('ID 입력해주세요.');
                this.$refs.userId.focus();
                return;
            }

            if(userPwd === ''){
                alert('비밀번호를 입력해주세요.');
                this.$refs.userPwd.focus();
                return;
            }

            let param = {
                USER_ID : userId,
                USER_PASSWORD : userPwd,
                USE_TIME : 1, //1day
            };

            _axios.get(_apiUrl + 'list/userLogin', {
                params: param
            })
            .then((response) => {

                let result = response.data;
                if(result.result !== 1){
                    alert('로그인에 실패 하였습니다.');
                    return;
                }

                if(result.data.code !== 1){
                    alert('ID 또는 비밀번호를 확인해 주세요.');
                    this.$refs.userId.focus();
                    return;
                }

                this.$refs.userId.blur();
                this.$refs.userPwd.blur();

                localStorage.setItem('asToken', result.token);
                this.$parent.setToken(result.token);
                this.$parent.changeUserStatus(true);
                return;
            })
            .catch((error) => {
                console.log(error);
            });
            return;
        },
    }
};