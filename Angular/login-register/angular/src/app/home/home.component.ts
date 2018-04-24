import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/*service*/
import { UserService } from '../user.service';

/*model*/
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    userList : User[];

    constructor(
        private _router : Router,
        private _userService : UserService
    ) { }

    getUserList() {
        this._userService.getUserList()
            .then((r_userList) => {
                console.log(r_userList);
                this.userList = r_userList;
            });
    }

    onBack() {
        this._router.navigate(['/']);
        return;
    }

    ngOnInit() {
        this.getUserList();
        return;
    }

}
