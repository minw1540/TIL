<template>
    <div id="app" class="app-container">
        <component :is="!isLogin ? 'Login' : 'List'"></component>
    </div>
</template>

<script>

import _axios from 'axios';

import Login from './components/login/login.vue'
import List from './components/todoList/list.vue'

const _apiUrl = process.env.VUE_APP_API_URL;

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
        isLogined() {
            let token = localStorage.getItem('asToken');

            if(token === null){
                return;
            }

            _axios.get(_apiUrl + 'list/isLogined', {
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
            });
            return;
        },
    },
    created() {
        this.isLogined();
        return;
    },
}
</script>

<style type="text/css" src="./assets/css/reset.css"></style>
