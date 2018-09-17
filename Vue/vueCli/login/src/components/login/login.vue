<template>
    <div id="login" class="login-container">
        <ul class="login-area">
            <li class="login-box">
                <i class="login-input-icon material-icons">&#xE853;</i>
                <input class="login-input"
                    type="text"
                    autocomplete="off"
                    placeholder="id"
                    ref="userId"
                    v-model="userId"
                />
            </li>

            <li class="login-box">
                <i class="login-input-icon material-icons">&#xE0DA;</i>
                <input class="login-input"
                    type="password"
                    autocomplete="off"
                    placeholder="pwd"
                    ref="userPwd"
                    v-model="userPwd"
                    @keyup.enter="login"
                />
            </li>

            <li class="login-btn-box">
                <button class="login-btn pointer" @click="login">입장!</button>
            </li>
        </ul>
    </div>
</template>
<script type="text/javascript" src="./js/loginIndex.js"></script>
<style type="text/css" src="./css/login.css"></style>