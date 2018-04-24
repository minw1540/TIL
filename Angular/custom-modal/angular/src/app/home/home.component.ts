import { Component, OnInit } from '@angular/core';

/*service*/
import { ModalService } from '../_services/index';

@Component({
    moduleId : module.id.toString(),
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    bodyText : string;

    constructor(
        private modalService : ModalService
    ) { }

    ngOnInit() {
        this.bodyText = '1번 모달을 통해 텍스트 변경 가능!';
        return;
    }

    openModal(id : string) {
        this.modalService.open(id);
        return;
    }

    closeModal(id : string) {
        this.modalService.close(id);
        return;
    }

}
