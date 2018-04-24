import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/*service*/
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    _registerWarning : any = {
        userId : false,
        alreadyUsedId : false,
        userPwd : false,
        userName : false
    };

    constructor(
        private _router : Router,
        private _userService : UserService
    ) { }

    onRegister(userIdElem : HTMLInputElement, userPwdElem : HTMLInputElement, userNameElem : HTMLInputElement) : void {

        //툴팁 변수 초기화
        this._registerWarning = {
            userId : false,
            alreadyUsedId : false,
            userPwd : false,
            userName : false
        };

        let _userId = userIdElem.value.trim();
        let _userPwd = userPwdElem.value.trim();
        let _userName = userNameElem.value.trim();

        if(_userId === '' || _userId === null){
            console.log('user id is empty');
            userIdElem.focus();
            this._registerWarning.userId = true;
            return;
        }

        if(_userPwd === '' || _userPwd === null){
            console.log('user pwd is empty');
            userPwdElem.focus();
            this._registerWarning.userPwd = true;
            return;
        }

        if(_userName === '' || _userName === null){
            console.log('user name is empty');
            userNameElem.focus();
            this._registerWarning.userName = true;
            return;
        }
        this._userService.checkUserId(_userId)
            .then((r_user) => {

                if(typeof r_user !== 'undefined'){
                    console.log('already used this id');
                    userIdElem.focus();
                    this._registerWarning.alreadyUsedId = true;
                    return;
                }

                this.setUser(_userId, _userPwd, _userName);
                return;
            });
        return;
    }

    setUser(_userId : string, _userPwd : string, _userName : string) : void {
        this._userService.setAddUser(_userId, _userPwd, _userName);
        alert('가입 성공!');
        this._router.navigate(['/']);
        return;
    }

    //로그인 페이지로 이동
    goLogin() {
        this._router.navigate(['/']);
        return;
    }

    ngOnInit() {
        console.log('mw : [init Register Page !!]');
    }

}
