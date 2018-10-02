import _axios from 'axios';
import * as _config from '../../../assets/js/config.js';

export default {
    name : 'Todo',
    props : ['todo', 'edit'],
    methods : {
        changeTodoStatus() {

            let complete = undefined;

            if(this.todo.IS_COMPLETE === 1){
                complete = 0;
            }else{
                complete = 1;
            }

            _axios.put(_config.apiUrl + 'list/upDateToDoListStatus', {
                    NO : this.todo.NO,
                    IS_COMPLETE : complete,
                    token : this.$parent.$parent.token,
                })
                .then((response) => {

                    let result = response.data;

                    if(result.result !== 1){
                        alert('error!');
                        this.$parent.getList();
                        return;
                    }

                    this.todo.IS_COMPLETE = complete;
                    return;
                })
                .catch((error) => {
                    console.log(error);
                });
            return;
        },
        toggleEdit() {
            if(this.edit){
                this.edit = false;
            }else{
                this.edit = true;
            }

            return;
        }
    }
};