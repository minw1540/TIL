import { Injectable } from '@angular/core';

/*import models*/
import { User } from './_models/user';
import { UserList } from './_models/UserList';


@Injectable()
export class UserService {

    constructor() { }

    /*find user with id*/
    checkUserId(userId : string) : Promise<User> {
        return this.getUserList()
                .then(userList =>
                    userList.find(user => user.userId === userId)
            );
    }

    /*find user with id & pwd*/
    getUser(userId : string, userPwd : string) : Promise<User> {
        return this.getUserList()
                .then(userList =>
                    userList.find(user =>
                    user.userId === userId && user.userPwd === userPwd
                )
            );
    }

    /*user list*/
    getUserList() : Promise<User[]>{
        return Promise.resolve(UserList);
    }

    /*set addd list*/
    setAddUser(userId : string, userPwd : string, userName : string) {
        let _userListLength = UserList.length;
        let setUserParam = {
            userNumber : _userListLength + 1,
            userId : userId,
            userPwd : userPwd,
            userName : userName
        };

        UserList.push(setUserParam);

    }


}
