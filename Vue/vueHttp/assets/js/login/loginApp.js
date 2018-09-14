var loginData = {
    userId : '',
    userPwd : '',
};

function login() {
    var userId = this.userId.trim();
    var userPwd = this.userPwd.trim();

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

    var param = {
        USER_ID : userId,
        USER_PASSWORD : userPwd,
        USE_TIME : 1, //1day
    };

    axios.get(global_variable.apiUrl + 'list/userLogin', {
        params: param
    })
    .then(function (response) {
        console.log(response);
        var result = response.data;

        if(result.result !== 1){
            alert('로그인에 실패 하였습니다.');
            return;
        }

        if(result.data.code !== 1){
            alert('ID 또는 비밀번호를 확인해 주세요.');
            this.$refs.userId.focus();
            return;
        }

        console.log('성공!!');
        return;
    })
    .catch(function (error) {
        console.log(error);
    });

    return;
}


new Vue({
    el: '#app',
    data : loginData,
    methods : {
        login : login,
    }
});