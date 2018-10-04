<template>
    <div id="app" class="app-container">
        <component :is="!isLogin ? 'Login' : 'List'"></component>
    </div>
</template>

<script>

import _axios from 'axios';
import * as _config from './assets/js/config.js';

import Login from './components/login/login.vue'
import List from './components/todoList/list.vue'

export default {
    name: 'app',
    components: {
        Login,
        List
    },
    data() {
        return {
            isLogin : false,
            token : undefined,
        };
    },
    methods : {
        changeUserStatus (status) {
            this.isLogin = status;
            return;
        },
        setToken (token) {
            this.token = token;
            return;
        },
    },
    created() {
        let token = localStorage.getItem('asToken');

        if(token === null){
            return;
        }

        _axios.get(_config.apiUrl + 'list/isLogined', {
            params: {token : token}
        })
        .then((response) => {

            let result = response.data;

            if(result.data.code !== 1){
                localStorage.removeItem('asToken');
                return;
            }

            this.setToken(token);
            this.changeUserStatus(true);
            return;
        })
        .catch((error) => {
            console.log(error);
        });
        return;
    },
}
</script>

<style type="text/css" src="./assets/css/reset.css"></style>
