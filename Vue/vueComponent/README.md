# component

컴포넌트는 기본 HTML element를 확장해 재사용 가능한 코드로 캡술화

시킬 수 있습니다. 즉, 컴포넌트는 vue.js의 컴파일러가 특정 동작을

추가할 사용자 정의의 element 입니다.

### component 등록하기

Vue.component 메서드를 사용하여 컴포넌트를 등록 합니다.

Vue.component 메서드에  tag 와 constructor 을 parameter로 

전달 합니다. 여기서, tag는 컴포넌트의 이름이며, constructor는 

컴포넌트에 대한 옵션 입니다.


	Vue.component('todo', {
	    template : '<h1>To do List</h1>',
	});


template 이라는 옵션을 사용하여 어떠한 element를 출력해 줄 것 인지
정의 하였습니다.


### component 사용해 보기 

	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
	        <title>vue component</title>
	    </head>
	    <body>
	        <div id="app" class="container">
	            <todo></todo>
	            <todo></todo>
	            <todo></todo>
	        </div>
	    </body>
	    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	    <script type="text/javascript">
	
	        Vue.component('todo', {
	            template : '<h1>To do List</h1>',
	        });
	
	        new Vue({
	            el: '#app',
	        });
	
	    </script>
	</html>


'todo' 라는 컴포넌트를 등록한 후 `<todo>` 태그를 이용하여 해당 컴포넌트를

출력 및 재사용 하였습니다. 

이렇게 원하는 만큼 엘리먼트를 추가 할 수 있고, 컴포넌트를 재사용 할 수 있습니다.


### template의 사용

최종 결과에 렌더링 되지 않는 엘리먼트인 `<template>`을 사용하여

컴포넌트에서 인라인 형식의 템플릿이 아닌 HTML형식으로 변경해 보겠습니다.

	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
	        <title>vue component</title>
	    </head>
	    <body>
	        <div id="app" class="container">
	            <todo></todo>
	            <todo></todo>
	            <todo></todo>
	        </div>
	
	        <template id="todoItem">
	            <h1>To do List!!</h1>
	        </template>
	
	    </body>
	    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	    <script type="text/javascript">
	
	        Vue.component('todo', {
	            template : '#todoItem',
	        });
	
	        new Vue({
	            el: '#app',
	        });
	
	    </script>
	</html>


인라인 형식의 템플릿을 html 형식으로 변경 하였습니다.


### Props 옵션

Props 옵션은 상위 컴포넌트로 부터 데이터를 받을 수 있는 옵션입니다.

하위 컴포넌트는 상위 컴포넌트의 데이터에 직접 참조 할 수 없습니다. 

v-bind를 사용하여 데이터를 동적으로 바인딩 하겠습니다.

v-bind은 부모의 데이터를 자식 컴포넌트의 props에 동적으로 

데이터를 바인딩 해줍니다. 또한 부모의 데이터가 업데이트되면 자식 컴포넌트의 

데이터도 변경되도록  전달합니다.


	Vue.component('todo', {
	    template : '#todoItem',
	    props : ['todo'],
	});
	

props로 전달 받을 데이터의 이름을 'todo'라 명칭하였습니다.


    <div id="app" class="container">
        <h1>Todo List</h1>
        <ul class="list-group">
            <todo v-for="todo in todos" v-bind:todo="todo"></todo>
        </ul>
    </div>
   

v-for를 이용하여 배열을 순회 하고, v-bind를 사용하여

`<todo>` 컴포넌트에 todo라는 데이터를 전달 합니다.

	<template id="todoItem">
	    <li class="list-group-item">
	        {{ todo.contents }}
	    </li>
	</template>

`<todo>` 컴포넌트의 템플릿 입니다.

todo라는 데이터의 contents를 참조하여 출력합니다.


### To do List를 component 형식으로 변경하기

앞 전에 진행 하였던 To do List를 컴포넌트 형식으로 변경 하겠습니다.


	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
	        <title>vue component</title>
	    </head>
	    <body>
	        <div id="app" class="container">
	            <h1>Todo List</h1>
	            <ul class="list-group">
	                <todo v-for="todo in todos" v-bind:todo="todo"></todo>
	            </ul>
	
	            <div>
	                <h1>리스트 추가</h1>
	                <input v-model="userInput" @keyup.enter="addTodoList"/>
	                <button @click="addTodoList">추가하기</button>
	            </div>
	        </div>
	
	        <template id="todoItem">
	            <li class="list-group-item">
	                {{ todo.index + 1 }} 번  {{ todo.contents }}
	            </li>
	        </template>
	    </body>
	    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	    <script type="text/javascript">
	
	        var data = {
	            userInput : '',
	            todos: [
	                {
	                    index : 0,
	                    contents : 'ES6 공부하기',
	                },
	                {
	                    index : 1,
	                    contents : 'Angular 공부하기',
	                },
	                {
	                    index : 2,
	                    contents : 'Vue 공부하기',
	                },
	                {
	                    index : 3,
	                    contents : '맛있는것 먹기',
	                },
	            ],
	        };
	
	        //to do list 추가
	        function addTodoList() {
	            if(this.userInput === ''){
	                return;
	            }
	
	            this.todos.push({index : this.todos.length, contents : this.userInput});
	            this.userInput = '';
	            return;
	        };
	
	
	        Vue.component('todo', {
	            template : '#todoItem',
	            props : ['todo'],
	        });
	
	        new Vue({
	            el: '#app',
	            data: data,
	            methods : {
	                addTodoList : addTodoList,
	            }
	        });
	
	    </script>
	</html>


v-for문을 이용하여 바로 출력 하던 데이터를 컴포넌트를 사용하여

하위 컴포넌트에서 출력하도록 변경 하였습니다.

