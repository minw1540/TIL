# 자바스크립트 Scope(스코프)

### 1. Scope(유효범위) 란?
---

Scope란 현재 접근할 수 있는 변수들의 범위를 뜻한다. 현재 실행 위치에서 접근 가능한 변수들의 범위를 뜻하며,
해당 Scope 안에서는 변수에 접근하여 읽기와 쓰기가 가능하고, 동일 Scope 안의 변수가 아니라면 접근이 불가능하다.


### 2. Global Scope(전역 스코프)
---

- 코드 어디에서든 접근 가능한 Scope, 함수 내부, 외부 상관없이 어디서든 접근 가능하다.
- `var` 키워드로 선언한 전역 변수는 window(전역 객체)의 프로퍼티이다


		const myVariable = 'Global!';
		
		function call() {
			return console.log(myVariable);
		}
		
		call();	
		console.log(myVariable);


- `var` 사용시 두번째로 선언된 변수가 첫번째로 선언된 변수를 덮어 값이 달라 진다.

		var myVariable = 1;
		var myVariable = 2;
		console.log(myVariable);// 결과 : 2


- `let` 사용시 변수명 충돌로 인한 에러가 발생한다.
	
		let myVariable = 1;
		let myVariable = 2;
		console.log(myVariable);// SyntaxError: Identifier 'myVariable' has already been declared


### 3. Local Scope(지역 스코프) - Function Scope(함수 스코프)
---

- `function` 구문을 통하여 Scope 생성이 가능하며, 함수 내부의 변수는 함수 외부에서 접근 할 수 없다.

	
		function myFunction() {
			var myVariable = 1;
			return console.log(myVariable);
		}
		
		myFunction(); // 결과 : 1
		console.log(myVariable);//ReferenceError: myVariable is not defined


- Global Scope와 Local Scope에 동일한 변수명을 지닌 변수가 존재 할 경우 전역 영역에서는 Local Scope에 접근이 불가능 하고, 함수 내부에서는 Global Scope와 Local Scope 모두 참조 가능하나 우선적으로 현재 위치와 가장 가까운 Local Scope 먼저 참조 한다.


		var myVariable = 'Global';
		
		function myFunction() {
			var myVariable = 'Local';
			return console.log(myVariable);
		}
		
		myFunction();//결과 : 'Local'
		console.log(myVariable);//결과 : 'Global'



### 4. Local Scope(지역 스코프) -  Block Scope(블록 스코프)
---

- 자바스크립트는 ES6(ECMAScript 6) 이전에 Block-Level Scope를 지원하지 않았다. (현재 지원)
- 중괄호`({})` 내부에서 `const` 또는 `let`으로 변수를 선언하면, 그 변수들은 중괄호 블록 내부에서만 접근할 수 있다.

		if(true){
			let myVariable = 1;
			console.log(myVariable);// 결과 : 1
		}
		
		console.log(myVariable);// ReferenceError: myVariable is not defined

- `let`이나 `const`가 아닌 `var`를 사용하여 변수를 선언 할 경우 `var` 자체가 `let`와 `const`를 대체 가능하고,  Function Scope를 보유 하기 때문에 블록 외부에서 접근이 가능하다.

		if(true){
			var myVariable = 1;
			console.log(myVariable);// 결과 : 1
		}
		
		console.log(myVariable);// 결과 : 1
		
		

### 5. Lexical scope(렉시컬 스코프) 

- 함수가 다른 함수 내부에 정의되어 있다면, 내부 함수는 외부 함수의 변수에 접근할 수 있지만, 외부 함수는 내부 함수의 변수에 접근할 수 없다.


		function outerFunction() {
			var outer = 'outer';
		
			function innerFunction() {
				var inner = 'inner';
				console.log(outer);//결과 : 'outer'
				return;
			}
		
			innerFunction();
			console.log(inner);// ReferenceError: inner is not defined
			return;
		}
		
		outerFunction();
