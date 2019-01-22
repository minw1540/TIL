# 자바스크립트 Module Pattern(모듈 패턴)


자바스크립트의 Module Pattern(모듈 패턴)은 자바스크립트 코드 관리 기법 중 하나 이다.
객체에 유효범위를 주어 private, public을 구분하여 캡슐화 할 수 있다. (ES6 부터는 class 지원.)

- IIFE (즉시실행함수) + Closure(클로저)의 결합

<br>
### 1. 모듈 작성 순서 예시
---

>
> 1. 변수 선언 (해당 모듈 스코프에서 사용될 변수)
> 2. 유틸리티 메소드 작성
> 3. DOM 조작 메소드 작성
> 4. 이벤트 핸들러 작성
> 5. public 메소드 작성
> 6. return
>

<br>
	
	var app = (function () {
	
		// 1. 변수 선언 (해당 모듈 스코프에서 사용될 변수)
		var myVariable = {};
	
		// 2. 유틸리티 메소드 작성
		var utilMethod = function () {
			return;
		};
	
		// 3. DOM 조작 메소드 작성
		var domMethod = function () {
			return;
		};
	
		// 4. 이벤트 핸들러 작성
		var eventMethod = function () {
			return;
		};
	
		// 5. public 메소드 작성
		var publicMethod = function () {
			return;
		};
	
		// 6. return
		return {
			public : publicMethod
		};
	})();
