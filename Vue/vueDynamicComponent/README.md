# Vue 동적 컴포넌트 

vue의 Dynamic Component를 사용하여 렌더링하는 컴포넌트를 변경 해 보겠습니다.

### <component>

`<component>` 라는 예약어를 사용하여 여러 컴포넌트를 동적으로 교체 할 수 있습니다.

이때 `is` 라는 특수 속성이 사용됩니다.

### App.vue


	<template>
	    <div id="app" class="app-container">
	        <component :is="!isLogin ? 'Login' : 'List'"></component>
	    </div>
	</template>
	
	<script>
	
	import _axios from 'axios';
	import * as _config from './assets/js/config.js';
	
	import Login from './components/login/login.vue'
	import List from './components/list/list.vue'
	
	export default {
	    name: 'app',
	    components: {
	        Login,
	        List
	    },
	    data() {
	        return {
	            isLogin : false,
	        };
	    },
	    methods : {
	        changeUserStatus (status) {
	            this.isLogin = status;
	            return;
	        },
	    },
	    created() {
	        ...
	    },
	}
	</script>
	

`isLogin` 이라는 변수가 false 이면 `Login` 컴포넌트를 보여주고

true 이면 `List` 컴포넌트를 보여줍니다.