# v-for

배열의 각 항목을 순회 하여 렌더링 하는 디렉티브 입니다.

item in Array 형태로 Array는 원본 데이터 배열이고, 

item은 배열 안의 각 항목들의 별칭이 됩니다.

### v-for의 객체 프로퍼티

기본적인 v-for 구문은 아래와 같은 형태 입니다.

	<ul>
	    <li v-for="item in Array">
	        {{ item }}
	    </li>
	</ul>
	
v-for는 해당 배열의 index와 key, value값을 표기 할 수 있습니다.

	<ul>
	    <li v-for="(value, key, index) in Array">
	        {{ index }} : {{ key }} : {{ value }}
	    </li>
	</ul>


### To Do List 

(디자인 편의를 위해 부트스트랩 css를 사용 했습니다.)

	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
	        <title>vue For</title>
	    </head>
	    <body>
	        <div id="app" class="container">
	            <h1>Todo List</h1>
	            <ul class="list-group">
	                <li v-for="(todo, num) in todos" class="list-group-item">
	                    {{ num + 1 }} 번 {{ todo }}
	                </li>
	            </ul>
	        </div>
	    </body>
	    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	    <script type="text/javascript">
	
	        var data = {
	            todos: [
	                'ES6 공부하기',
	                'Angular 공부하기',
	                'Vue 공부하기',
	                '맛있는것 먹기',
	                '달달한것 먹기',
	            ],
	        };
	
	        new Vue({
	            el: '#app',
	            data: data,
	        });
	
	    </script>
	</html>
	
todos라는 배열에 항목들을 넣었습니다.

그리고 v-for 구문을 사용하여 num 이라 명칭된 index와 

todo라 명칭된 배열 항목을 출력하였습니다.


### 이벤트 핸들링

To Do List를 출력하였으니 리스트에 추가도 해보겠습니다.

그전에 이벤트를 처리하는 방법을 알아 보겠습니다.


`v-on` 디렉티브를 사용하여 DOM 이벤트를 청취 하고 트리거 됩니다.

	<div id="example-1">
	  <button v-on:click="counter += 1">Add 1</button>
	  <p>위 버튼을 클릭한 횟수는 {{ counter }} 번 입니다.</p>
	</div>
	
`v-on`의 약어는 @ 입니다.

 	<div id="example-1">
	  <button @click="counter += 1">Add 1</button>
	  <p>위 버튼을 클릭한 횟수는 {{ counter }} 번 입니다.</p>
	</div>


### methods

To Do List 추가를 위해 methods를 사용 하겠습니다.

	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
	        <title>vue For</title>
	    </head>
	    <body>
	        <div id="app" class="container">
	            <h1>Todo List</h1>
	            <ul class="list-group">
	                <li v-for="(todo, num) in todos" class="list-group-item">
	                    {{ num + 1 }} 번 {{ todo }}
	                </li>
	            </ul>
	
	            <div>
	                <h1>리스트 추가</h1>
	                <input v-model="userInput"/>
	                <button @click="addTodoList">추가하기</button>
	            </div>
	        </div>
	    </body>
	    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	    <script type="text/javascript">
	
	        var data = {
	            userInput : '',
	            todos: [
	                'ES6 공부하기',
	                'Angular 공부하기',
	                'Vue 공부하기',
	                '맛있는것 먹기',
	                '달달한것 먹기',
	            ],
	        };
	
	        function addTodoList() {
	            if(this.userInput === ''){
	                return;
	            }
	
	            this.todos.push(this.userInput);
	            this.userInput = '';
	            return;
	        };
	
	        new Vue({
	            el: '#app',
	            data: data,
	            methods : {
	                addTodoList : addTodoList,
	            }
	        });
	
	    </script>
	</html>


data에 사용자로 부터 입력 받을 변수를 선언하고,

addTodoList() 라는 함수를 만들었습니다.

그리고 Vue의 methods 인자를 통해 해당 함수를 정의했습니다.

이제, input 태그에 리스트 항목을 작성한 후 '추가하기' 버튼을 누르면

todos 배열항목에 추가가 되어 To Do List 항목에 출력이 됩니다.

리스트를 추가하는 input 태그에 

`<input v-model="userInput" @keyup.enter="addTodoList"/>` 
과 같이  `@keyup.enter="addTodoList"`를 추가하면 enter key 이벤트로 addTodoList()함수를 호출 할 수 있습니다.