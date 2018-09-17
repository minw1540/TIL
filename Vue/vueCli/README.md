# Vue CLI

vue 프로젝트를 vue-cli를 사용하여 관리 및 빌드 해 보도록 하겠습니다.

vue-cli는 Vue.js 프로젝트를 구성하기 위한 간당한 명령줄 인터페이스 입니다.

[vue-cli](https://cli.vuejs.org/)

### install

`npm install -g @vue/cli`

### 프로젝트 생성

`vue create <project-name>`

### 기본 구성 요소

	# dist            : 빌드 결과물 (프로젝트를 빌드하기 이전에는 존재하지 않습니다.)
	# node_modules    : 설치한 의존성 모듈
	# public          : public 형식의 파일
	# src             : 소스코드
	# babel.config.js : 바벨 빌드시 설정 파일
	# .gitignore
	# package.json

### vue-cli 기본 명령어 

	# Project setup : npm install
	# Compiles and hot-reloads for development : npm run serve 
	# Compiles and minifies for production : npm run build
	# Lints and fixes files : npm run lint
	

### vue-cli로 로그인 화면 만들기

이전 [vueHttp](https://github.com/minw1540/TIL/blob/master/Vue/vueHttp/) 프로젝트에서 진행했던 로그인화면을 vue-cli로 옮겨 보겠습니다.

우선 http 통신을 위해 `axios`를 설치 하겠습니다.

`$ npm install axios`

### 개발용 Compiles 실행

`$ npm run serve`

해당 명령어 실행 이후 `http://localhost:8080/` 에 접속하시면

기본적인 vue 화면을 확인 하실 수 있습니다.


### ./public/index.html

	<!DOCTYPE html>
	<html lang="ko" >
	  <head>
	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	    <link rel=stylesheet href="https://fonts.googleapis.com/icon?family=Material+Icons">
	    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
	    <title>login</title>
	  </head>
	  <body>
	    <noscript>
	      <strong>We're sorry but login doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
	    </noscript>
	    <div id="app"></div>
	    <!-- built files will be auto injected -->
	  </body>
	</html>


viewport와 google 아이콘을 import 하였습니다.

### ./src

소스 코드가 존재하는 src 폴더 입니다.

해당 폴더의 구조를 아래와 같이 작성하였습니다.

	./src
	|____App.vue
	|____assets
	| |____css
	| | |____reset.css
	| |____js
	| | |____config.js
	| |____logo.png
	|____components
	| |____login
	| | |____css
	| | | |____login.css
	| | |____js
	| | | |____loginIndex.js
	| | |____login.vue
	|____main.js


`assets/` 아래에는 전역 으로 사용될 css와 js파일을 넣어두었습니다.

### App.vue

현재 프로젝트의 가장 최상위 컴포넌트가 될 App.vue 파일입니다.

	<template>
	    <div id="app">
	        <Login/>
	    </div>
	</template>
	
	<script>
	import Login from './components/login/login.vue'
	
	export default {
	    name: 'app',
	    components: {
	        Login
	    }
	}
	</script>
	
	<style type="text/css" src="./assets/css/reset.css"></style>

`<template>` 에 `<Login>` 템플릿을 넣었습니다.

`<script>` 에서는 `Login` 컴포넌트을 import 하였습니다.

`<style>` 에서는 reset.css를 import 하였습니다.

### Login Component

로그인 화면을 그려줄 Login 컴포넌트 입니다.


	./src/components
	|____login
	| |____css
	| | |____login.css
	| |____js
	| | |____loginIndex.js
	| |____login.vue


`./src/components` 폴더에 `login` 폴더를 생성후 

아래에 `css`와 `js`폴더를 나눠 두었습니다.


### ./src/components/login.vue

로그인 화면 템플릿 입니다.

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
	

App.vue와 같이 js파일과 css파일을 import 하였습니다.


### ./src/components/js/loginIndex.js

로그인 화면의 컴포넌트 입니다.

	import _axios from 'axios';
	import * as _config from '../../../assets/js/config.js';
	
	const loginData = {
	    userId : '',
	    userPwd : '',
	};
	
	export default {
	    data () {
	        return loginData;
	    },
	    methods : {
	        login() {
	            let userId = this.userId.trim();
	            let userPwd = this.userPwd.trim();
	
	            if(userId === ''){
	                alert('ID 입력해주세요.');
	                this.$refs.userId.focus();
	                return;
	            }
	
	            if(userPwd === ''){
	                alert('비밀번호를 입력해주세요.');
	                this.$refs.userPwd.focus();
	                return;
	            }
	
	            let param = {
						...
	            };
	
	            _axios.get('path/to/login', {
	                params: param
	            })
	            .then((response) => {
	                console.log(response);
	                let result = response.data;
	
	                if(result.result !== 1){
	                    alert('로그인에 실패 하였습니다.');
	                    return;
	                }
	
	                if(result.data.code !== 1){
	                    alert('ID 또는 비밀번호를 확인해 주세요.');
	                    this.$refs.userId.focus();
	                    return;
	                }
	
	                console.log('성공!!');
	                return;
	            })
	            .catch((error) => {
	                console.log(error);
	            });
	            return;
	        },
	    }
	};


코드는 이전에 [vueHttp](https://github.com/minw1540/TIL/blob/master/Vue/vueHttp/)에서 사용하던 코드와 동일 합니다.

http 를 위해 `axios` 모듈을 import 해주고, 

전역 변수인 config를 import 해주었습니다.

### 배포용 Compiles

`npm run build` 명령어를 사용하시면 배포용 컴파일이 진행되고

./dist 폴더가 생성되며, src폴더의 파일들이 컴파일 되어 적제 되어 있는 것을 확인 하실 수 있습니다.

