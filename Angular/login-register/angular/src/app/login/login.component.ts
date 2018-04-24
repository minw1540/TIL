import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/*service*/
import { UserService } from '../user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    _loginWarning : any = {
        userId : false,
        userPwd : false,
        unknownUserId : false
    };

    constructor(
        private _router : Router,
        private _userService : UserService
    ) { }

    //로그인 함수
    onLogin(userIdElem : HTMLInputElement, userPwdElem : HTMLInputElement) : void {

        //툴팁 변수 초기화
        this._loginWarning = {
            userId : false,
            userPwd : false,
            unknownUserId : false
        };

        let _userId = userIdElem.value.trim();
        let _userPwd = userPwdElem.value.trim();

        if(_userId === '' || _userId === null){
            console.log('user id is empty');
            userIdElem.focus();
            this._loginWarning.userId = true;
            return;
        }

        if(_userPwd === '' || _userPwd === null){
            console.log('user pwd is empty');
            userPwdElem.focus();
            this._loginWarning.userPwd = true;
            return;
        }


        this._userService.getUser(_userId, _userPwd)
            .then((r_user) => {

                if(typeof r_user === 'undefined'){
                    console.log('unknown user id');
                    userIdElem.focus();
                    this._loginWarning.unknownUserId = true;
                    return;
                }

                this._router.navigate(['/home']);
                return;
            });

        return;
    }

    //등록 페이지 이동 함수
    goRegister() {
        this._router.navigate(['/register']);
        return;
    }

    ngOnInit() {
        console.log('mw : [ init Login Page !!]');
    }

}
