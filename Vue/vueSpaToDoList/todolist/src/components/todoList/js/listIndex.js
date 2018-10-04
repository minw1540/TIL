import _axios from 'axios';
import * as _config from '../../../assets/js/config.js';
import * as _ from 'underscore';

import Todo from '../../todoItem/todo.vue'

const listData = {
    list : [],
    newTodoInput : '',
};

export default {
    name : 'List',
    components: {
        Todo,
    },
    data () {
        return listData;
    },
    methods : {
        getList() {

            if(typeof this.$parent.token === 'undefined'){
                return;
            }

            _axios.get(_config.apiUrl + 'list/getToDoList', {
                params: {token : this.$parent.token}
            })
            .then((response) => {

                let result = response.data;

                if(result.result !== 1){
                    alert('error!');
                    return;
                }

                this.list = [];

                _.each(result.data, (data) => {
                    data.edit = false;
                    data.editText = data.CONTENT;
                    this.list.push(data);
                });
                return;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        addTodo() {

            let contents = this.newTodoInput.trim();

            if(contents === ''){
                return;
            }

            _axios.post(_config.apiUrl + 'list/addNewList', {
                token : this.$parent.token,
                contents : contents,
            })
            .then((response) => {

                let result = response.data;

                if(result.result !== 1){
                    alert('error!');
                    this.newTodoInput = '';
                    return;
                }

                this.newTodoInput = '';
                this.getList();
                return;
            })
            .catch((error) => {
                console.log(error);
                this.newTodoInput = '';
                return;
            });
        },
    },
    created() {

        if(typeof this.$parent.token === 'undefined'){
            this.$parent.changeUserStatus(false);
            return;
        }

        this.getList();
        return;
    }

};