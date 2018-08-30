# Vue란? 소개 및 시작 

### 1. Vue란?


Vue(/vjuː/ 로 발음, view 와 발음이 같습니다.)는 사용자 인터페이스를 만들기 위한 진보적인 프레임워크 입니다. 다른 단일형 프레임워크와 달리 Vue는 점진적으로 채택할 수 있도록 설계하였습니다. 핵심 라이브러리는 뷰 레이어만 초점을 맞추어 다른 라이브러리나 기존 프로젝트와의 통합이 매우 쉽습니다. 그리고 Vue는 현대적 도구 및 지원하는 라이브러리와 함께 사용한다면 정교한 단일 페이지 응용프로그램을 완벽하게 지원할 수 있습니다.

숙련된 프론트엔드 개발자이고 Vue를 다른 라이브러리/프레임워크와 비교하고 싶다면 다른 프레임워크와의 비교를 확인하십시오.

[Vue.js 공식 가이드](https://kr.vuejs.org/v2/guide/)


### 2. Anguar와의 비교

2.1  손쉬운 "Hello World!"

> Angular나 React에 비해 프로젝트를 시작하는게 손쉽다.
> 
> angulr-cil등 스타터킷을 npm으로 설치하고
> 
> 이것 저것 설정해야 하는 다른 프레임워크와는 달리 
> 
> 
> CDN으로 불러와 간단히 객체 선언만 해주면 선언 할 수 있습니다.
> 
> 물론 angular도 CDN으로 불러와 사용 할 수 있으며, 
> 
> vue도 vue-cli로 사용 할 수 있으나
> 
> angular를 CDN으로 불러온다면 더욱 복잡한 프로젝트 설정을 
> 
> 만나게 되는 반면 Vue는 그에 비해 new Vue({..})선언으로
> 
> 바로 Vue를 사용 할 수 있다는 장점이 있습니다.
> 


2.2 매우 잘 되어 있는 한글화

> 다른 프레임워크에 비해 Vue는 공식적으로 한글 문서를 제공합니다.


2.3 유사한 문법 

> Vue는 Angular와 유사한 문법을 구사하고 있습니다.
> 
> *ngIf, *ngFor와 같이 Vue는 v-if, v-for 형태의 문법을 
> 
> 사용 할 수 있습니다.
> 
> 또한, 양방향 바인딩을 사용 할 수 있습니다.
> 
> (단, 컴포넌트는 단뱡향 데이터흐름으로 강제 합니다.)
> 

2.4 구조적 강제성

> Angular는 매우 강제적인 프레임워크라고 생각합니다.
> 
> 또한 공식적인 빌드 시스템을 지원합니다.
> 
> 하지만, Vue는 애플리케이션 구조에 제한이 없습니다.
> 
> 이러한 점이 장점이 될 수도 단점이 될 수도 있을 것 같습니다.
>
> 확실한것은 Angular에 비해 유연하다는 것 입니다.
> 



### 2. Hello Vue

Vue를 시작하며, 첫 시작으로 "Hello Vue" 를 호출해 보겠습니다.


	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <title>Hello Vue!</title>
	    </head>
	    <body>
	        <div id="app">
	            <h1>Hello Vue!</h1>
	        </div>
	    </body>
	</html>

현재는 단순한 html 입니다.

이곳에 CDN에서 Vue를 가져와 html 에 포함 시키고,
Vue를 정의 하겠습니다.


	<!doctype html>
	<html lang="ko" >
	    <head>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	        <title>Hello Vue!</title>
	    </head>
	    <body>
	        <div id="app">
	            <h1>Hello Vue!</h1>
	        </div>
	    </body>
	
	    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
	    <script type="text/javascript">
	
	        var data = {
	            message : 'Hello Vue!',
	        };
	
	        new Vue({
	            el : '#app',
	            data : data
	        });
	    </script>
	
	</html>

Vue를 사용하기 위해 CDN에서 Vue를 불러와 script 태그로 포함 시키고,

새로운 Vue 인스턴스를 생성했습니다.

또한 Vue가 참조할 element가 id가 app인 div인것을 알려주기위해

'el'에  '#app'이라고 알려주었습니다.

표현 하려는 메시지는 data 객체 내부의 변수로 할당하여, Vue 생성자 옵션의 data 객체에 전달 하였습니다.


    <div id="app">
        <h1>{{ message }}</h1>
    </div>


본래 'Hello Vue!' 라고 적혀 있던 h1 태그를 

{{}} 바인딩 표현식을 사용하여 data 객체의 mesaage 변수로 정의 하였습니다.

