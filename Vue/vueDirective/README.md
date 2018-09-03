# Vue Directive

Directive는 DOM 엘리먼트가 무언가를 수행하도록 지시하는 

특수한 토큰 입니다.

v-show, v-if, v-else, v-for, 사용자 정의 (커스텀)  디렉티브  등

이 있습니다. 


* v-show : 조건에 따라 엘리먼트 css의 display속성을 토글합니다.
* v-if : 조건에 따라 엘리먼트를 생성합니다.
* v-else : v-if의 반대의 경우에 엘리먼트를 생성합니다.

### v-show와 v-if의 차이점

v-if를 사용한 경우 초기 렌더링에서 조건이 false 이면 

조건에 규합한 true를 반환 할때까지 해당 엘리먼트를 렌더링 하지 않습니다.

반대로 v-show는 초기 렌더링 당시 엘리먼트를 모두 렌더링 하고, 

조건에 따라 엘리먼트 css의 display속성을 토글합니다.

v-show의 경우에는 초기 렌더링 비용이 높습니다.

### v-show

사용자의 이름을 입력받고 성별을 선택받는다고 가정하고 작성하겠습니다.

	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <title>vue 디렉티브</title>
	    </head>
	    <body>
	        <div id="app">
	
	            <h1>Hello, {{ name }}</h1>
	
	            <div>
	                <div>이름을 입력해주세요.</div>
	                <input v-model="name"/>
	            </div>
	
	            <div style="margin-top: 15px;">
	                <div>성별을 선택해주세요.</div>
	                남자 : <input v-model="gender" type="radio" name="gender" value="man" />
	                여자 : <input v-model="gender" type="radio" name="gender" value="woman" />
	            </div>
	
	        </div>
	    </body>
	    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	    <script type="text/javascript">
	
	        var data = {
	            name : '',
	            gender : '',
	        };
	
	        new Vue({
	            el : '#app',
	            data : data
	        });
	    </script>
	</html>

v-model을 사용하여 사용자의 name을 입력받고 라디오 버튼을 사용하여 

사용자의 gender를 선택받습니다.


	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <title>vue 디렉티브</title>
	    </head>
	    <body>
	        <div id="app">
	
	            <h1>Hello, {{ name }}</h1>
	
	            <div>
	                <div>이름을 입력해주세요.</div>
	                <input v-model="name"/>
	            </div>
	
	            <div style="margin-top: 15px;">
	                <div>성별을 선택해주세요.</div>
	                남자 : <input v-model="gender" type="radio" name="gender" value="man" />
	                여자 : <input v-model="gender" type="radio" name="gender" value="woman" />
	            </div>
	
	            <h2 v-show="gender === 'man'">남성</h2>
	            <h2 v-show="gender === 'woman'">여성</h2>
	        </div>
	    </body>
	    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	    <script type="text/javascript">
	
	        var data = {
	            name : '',
	            gender : '',
	        };
	
	        new Vue({
	            el : '#app',
	            data : data
	        });
	    </script>
	</html>


v-show 디렉티브를 사용하여 gender가 'man'이라면 남성이라는 텍스트를

포함한 h2 태그가 보여지고, 'woman'이라면 여성이라는 텍스트의 h2 태그가 

보여지게 됩니다.



### v-if 와 `<template>` 엘리먼트

`<template>` 엘리먼트는 최종 결과에 렌더링 되지 않는 엘리먼트로

`<div>` 나 `<span>` 등의 태그를 사용하는 것이 적절하지 않을 경우

`<template>` 엘리먼트를 이용하여 보이지 않는 래퍼로 사용 할 수 있습니다.

v-show는`<template>` 엘리먼트를 사용할 수 없습니다.




	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <meta name="description" content="description">
	        <title>vue 디렉티브</title>
	    </head>
	    <body>
	        <div id="app">
	            <template v-if="name">
	                <h1>Hello, {{ name }}</h1>
	            </template>
	
	            <template v-else>
	                <h1>안녕하세요, 정보를 입력해주세요.</h1>
	            </template>
	
	            <div>
	                <div>이름을 입력해주세요.</div>
	                <input v-model="name"/>
	            </div>
	
	            <div style="margin-top: 15px;">
	                <div>성별을 선택해주세요.</div>
	                남자 : <input v-model="gender" type="radio" name="gender" value="man" />
	                여자 : <input v-model="gender" type="radio" name="gender" value="woman" />
	            </div>
	
	            <div v-if="name && gender" style="margin-top: 15px;">
	                <h2>환영합니다.</h2>
	                <h2 v-show="gender === 'man'">남성</h2>
	                <h2 v-show="gender === 'woman'">여성</h2>
	                <h2>{{ name }} 님</h2>
	            </div>
	        </div>
	    </body>
	    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	    <script type="text/javascript">
	
	        var data = {
	            name : '',
	            gender : '',
	        };
	
	        new Vue({
	            el : '#app',
	            data : data
	        });
	    </script>
	</html>



`<template>` 엘리먼트에 v-if, v-else 조건을 주어 사용자가 

name을 입력하기 전에는 '안녕하세요, 정보를 입력해주세요.' 라는 문구가

출력되고, 입력하면 Hello, name 이 출력됩니다.

또한, `<div>`에도 조건을 주어 사용자가 name과 gender를 모두 

입력 및 선택 하게 되면 해당 엘리먼트가 출력되도록 하였습니다.


