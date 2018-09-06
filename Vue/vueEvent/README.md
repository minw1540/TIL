# 사용자 지정 이벤트 

모든 Vue 인스턴스는 이벤트 인터페이스를 구현하고 있습니다.

* $on(eventName) : 이벤트를 감지 합니다.

* $emit(eventName) : 이벤트를 트리거 해줍니다.

* $once(eventName) : 이벤트를 1번만 감지 합니다.

* $off(eventName) : 이벤트 리스너를 제거 합니다.

Vue의 이벤트 시스템은 브라우저의 EventTarget API와 별개입니다.

또한, $on(eventName)의 경우 자식 컴포넌트가 호출한 이벤트를

감지 하지 않습니다. v-on을 템플릿에 반드시 지정해야 합니다.

v-on (약어 @)를 사용하여 자식 컴포넌트에서 발생된 이벤트를 

부모 컴포넌트에서 직접 청취 할 수 있습니다.


### v-on (약어 : @)

v-on 디렉티브를 사용하여 카운트를 증감 시켜보겠습니다.


	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
	        <title>vue event</title>
	    </head>
	    <body>
	        <div id="app" class="container">
	            <h1>카운트</h1>
	            <p>
	                {{ totalCount }}
	            </p>
	        </div>
	    </body>
	    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	    <script type="text/javascript">
	        new Vue({
	            el: '#app',
	            data : {
	                totalCount : 0,
	            },
	        });
	    </script>
	</html>
	

총 카운트 개수를 위한 변수(totalCount)를 설정하고 그 값을 출력해주었습니다.

    <div id="app" class="container">
        <h1>카운트</h1>
        <p>
            {{ totalCount }}
        </p>
        <count></count>
        <count></count>
    </div>

    <template id="count">
        <button></button>
    </template>
  
그리고 카운트 증가, 감소 버튼을 위한 컴포넌트를 만들어 보겠습니다.

html을 위와 같이 추가 하고

    Vue.component('count', {
        template : '#count',
    });

'count'라는 이름의 Vue 컴포넌트를 추가해주었습니다.

이곳에 이벤트를 하나씩 추가해 보겠습니다.


    <div id="app" class="container">
        <h1>카운트</h1>
        <p>
            {{ totalCount }}
        </p>
        <count action="like"></count>
        <count action="unlike"></count>
    </div>

    <template id="count">
        <button @click="counter"> {{ action }} : {{ count }}</button>
    </template>


우선 'action'이라는 리터럴 데이터를 `<count>` 컴포넌트에 보내주고

해당 props를 출력하면서, 'count'라는 변수도 함께 출력해 주었습니다.

또한, click 이벤트로 counter를 호출 하게 만들었습니다.

    Vue.component('count', {
        template : '#count',
        props : ['action'],
        data : function () {
            return { count : 0 }
        },
        methods : {
            counter : function () {
                this.count++;
                return;
            },
        }
    });


Vue 컴포넌트에서도 'action'이라는 props를 인자로 받고

data로 count를 return해줍니다.

methods에는 위의 html 에서 click이벤트로 주었던 counter 함수를 

만들었습니다.

이제 'like'와 'unlike' 버튼이 만들어졌으며 각 버튼을 누르면

각 버튼의 숫자가 1씩 증가 하게 됩니다.

<br/>

하지만, 아직 'totalCount'는 변하지 않습니다.

이제 부터 'totalCount'의 숫자도 변경되도록 연동해 보겠습니다.



    <div id="app" class="container">
        <h1>카운트</h1>
        <p>
            {{ totalCount }}
        </p>
        <count action="like" @total="totalCounter"></count>
        <count action="unlike" @total="totalCounter"></count>
    </div>

    <template id="count">
        <button @click="counter"> {{ action }} : {{ count }}</button>
    </template>



 `<count>`에 '@total' 이라는 이벤트를 부모 컴포넌트에서 청취 할 수 있도록
 
 추가하며 해당 이벤트는 'totalCounter' 이라는 함수를 호출 하게 하였습니다.
 
	 '@total' 와 'v-on:total'은 동일한 의미 입니다.
	 
	 
	 Vue.component('count', {
	    template : '#count',
	    props : ['action'],
	    data : function () {
	        return { count : 0 }
	    },
	    methods : {
	        counter : function () {
	            this.count++;
	            this.$emit('total', this.action);
	            return;
	        },
	    }
	});
	

'count' 컴포넌트에서는 해당 컴포넌트의 count를 증가 시키면서
	
'$emit'을 이용하여 이벤트를 발생 키켰습니다. 발생 하는 이벤트의 이름을

'total'로 하고, 인자로 해당 컴포넌트의 props인 'action'을 넘겨주었습니다.

    new Vue({
        el: '#app',
        data : {
            totalCount : 0,
        },
        methods : {
            totalCounter : function (action) {
                if(action === 'like'){
                    this.totalCount++;
                }else{
                    this.totalCount--;
                }
                return;
            },
        },
    });

부모 컴포넌트에서는 'totalCounter' 함수를 추가하여 'action'인자에 

따른 증가와 감소를 하게 하였습니다.

아래는 전체 코드 입니다.


	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
	        <title>vue event</title>
	    </head>
	    <body>
	        <div id="app" class="container">
	            <h1>카운트</h1>
	            <p>
	                {{ totalCount }}
	            </p>
	            <count action="like" @total="totalCounter"></count>
	            <count action="unlike" @total="totalCounter"></count>
	        </div>
	
	        <template id="count">
	            <button @click="counter"> {{ action }} : {{ count }}</button>
	        </template>
	
	    </body>
	    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	    <script type="text/javascript">
	
	        Vue.component('count', {
	            template : '#count',
	            props : ['action'],
	            data : function () {
	                return { count : 0 }
	            },
	            methods : {
	                counter : function () {
	                    this.count++;
	                    this.$emit('total', this.action);
	                    return;
	                },
	            }
	        });
	
	        new Vue({
	            el: '#app',
	            data : {
	                totalCount : 0,
	            },
	            methods : {
	                totalCounter : function (action) {
	                    if(action === 'like'){
	                        this.totalCount++;
	                    }else{
	                        this.totalCount--;
	                    }
	                    return;
	                },
	            },
	        });
	
	    </script>
	</html>
	

이렇게 자식 컴포넌트에서 발생한 이벤트를 부모 컴포넌트에서 받아

카운트를 증가와 감소 시켜 보았습니다.

