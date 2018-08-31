# Vue의 양방향 바인딩

v-model을 사용하여 사용자가 입력한 내용에 따라 데이터 값이 동적으로 

변경되도록 양방향 데이터 바인딩을 해보겠습니다.

데이터는 기본적으로 모든 입력 이벤트에 동기화 됩니다.

### v-model


	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <title>Vue Model</title>
	    </head>
	    <body>
	        <div id="app">
	            <h1> Hello {{ name }}</h1>
	            <div>
	                <div>input your name : </div>
	                <input v-model="name"/>
	            </div>
	        </div>
	
	    </body>
	    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	    <script type="text/javascript">
	
	        var data = {
	            name : '',
	        };
	
	        new Vue({
	            el : '#app',
	            data : data
	        });
	    </script>
	</html>

input 태그 안에 v-model이라고 정의하여, 해당 input이 어떠한 변수와 바인딩 되었는지 알려주었습니다.


양방향 데이터 바인딩을 통해 뷰에서 모델의 값이 변경되면 해당 값은 항상 최신의 값으로 갱신됩니다.