import _axios from 'axios';

const _apiUrl = process.env.VUE_APP_API_URL;

export default {
    name : 'Todo',
    props : ['todo'],
    methods : {
        changeTodoStatus(status) {

            if(typeof status === 'undefined'){
                return;
            }

            let complete = status;

            _axios.put(_apiUrl + 'list/upDateToDoListStatus', {
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

                    if(this.todo.IS_COMPLETE === 3){
                        this.toggleEdit();
                        this.$parent.getList();
                    }
                    return;
                })
                .catch((error) => {
                    console.log(error);
                });
            return;
        },
        toggleEdit() {
            if(this.todo.edit){
                this.todo.edit = false;
            }else{
                this.todo.edit = true;
            }

            return;
        },
        editTodoContent() {

            let editText = this.todo.editText.trim();

            if(editText === this.todo.CONTENT){
                this.$refs.editTextElem.blur();
                this.toggleEdit();
                return;
            }

            if(editText === ''){
                alert('내용을 입력해 주세요.');
                this.$refs.editTextElem.focus();
                return;
            }

            _axios.put(_apiUrl + 'list/upDateToDoListContent', {
                    NO : this.todo.NO,
                    CONTENT : editText,
                    token : this.$parent.$parent.token,
                })
                .then((response) => {

                    let result = response.data;

                    if(result.result !== 1){
                        alert('error!');
                        this.$parent.getList();
                        return;
                    }

                    this.todo.CONTENT = editText;
                    this.toggleEdit();
                    return;
                })
                .catch((error) => {
                    console.log(error);
                });
            return;
        }
    }
};