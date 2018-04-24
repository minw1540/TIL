import { Injectable } from '@angular/core';

/*import underscore*/
import * as _ from 'underscore';

@Injectable()
export class ModalService {

    private modals : any[] =[];

    add(modal : any) {
        console.log(modal);
        this.modals.push(modal);
        return;
    }

    remove(id : string) {
        let modalToRemove = _.findWhere(this.modals , {id : id});
        this.modals = _.without(this.modals, modalToRemove);
        return;
    }

    open(id : string) {
        let modal = _.findWhere(this.modals, {id : id});
        modal.open();
        return;
    }

    close(id : string) {
        let modal = _.find(this.modals, {id : id});
        modal.close();
        return;
    }


  constructor() { }

}
