import _axios from 'axios';
import * as _config from '../../../assets/js/config.js';

const listData = {
    list : [],
    token : undefined,
};

export default {
    name : 'List',
    data () {
        return listData;
    },
    methods : {
        getList() {

            if(typeof this.token === 'undefined'){
                return;
            }

            _axios.get(_config.apiUrl + 'list/getToDoList', {
                params: {token : this.token}
            })
            .then((response) => {

                let result = response.data;

                if(result.result !== 1){
                    alert('error!');
                    return;
                }

                this.list = result.data;
                console.log(this.list);
                return;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    created() {
        let token = localStorage.getItem('asToken');

        if(token === null){
            return;
        }

        this.token = token;
        this.getList();
        return;
    }

};