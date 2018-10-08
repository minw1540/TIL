import _axios from 'axios';
import * as _ from 'underscore';

import Todo from '../../todoItem/todo.vue'

const _apiUrl = process.env.VUE_APP_API_URL;

const listData = {
    list : [],
    newTodoInput : '',
    isApiCall : false,
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

            _axios.get(_apiUrl + 'list/getToDoList', {
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
            });
        },
        addTodo() {

            if(this.isApiCall){
                return;
            }

            let contents = this.newTodoInput.trim();

            if(contents === ''){
                return;
            }

            this.isApiCall = true;

            _axios.post(_apiUrl + 'list/addNewList', {
                token : this.$parent.token,
                contents : contents,
            })
            .then((response) => {

                this.isApiCall = false;

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
                this.isApiCall = false;
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