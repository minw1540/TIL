# 자바스크립트 Hoisting(호이스팅)

### 1. Hoisting(호이스팅) 이란?
---

변수를 선언하고 초기화했을 때 선언 부분이 최상단으로 끌어올려지는 현상.

`함수 선언식(function declaration)`과 `함수 표현식(function expression)` 방식이 있으나
`함수 표현식(function expression)`은 Hoisting(호이스팅) 되지 않는다.


### 2. 함수 선언식(function declaration)
---

함수 선언식(function declaration)으로 함수가 선언되면 해당 함수가 스코프 최상단으로 Hoisting(호이스팅)되어 두가지 모두 동일한 결과값을 보여준다.


	myFunction();//결과 : 'hi?'
	
	function myFunction() {
		console.log('hi?');
		return;
	}
	
	myFunction();//결과 : 'hi?'
	

<br><br><br>
변수 역시 스코프 최상단으로 Hoisting(호이스팅)되어 `ReferenceError: myVariable is not defined`과 같은 에러가 아닌 `undefined `를 출력한다.

	console.log(myVariable); //결과 : undefined
	var myVariable = 'hi?';
	console.log(myVariable); //결과 : 'hi?'

<br><br><br>
첫번째 `console.log()`에서 `undefined`가 출력되는 이유는 자바스크립트에서는 선언문의 경우 자바스크립트 엔진이 가장 최우선적으로 해석을 하게되고, 변수 값의 할당의 경우 런타임 과정에서 이루어지기 때문에 Hoisting(호이스팅) 되지 않아 `undefined`가 출력된다.
	
	/**
	 * 선언된 'myVariable'가 먼저 Hoisting(호이스팅)되고 변수값은 런타임시 할당된다.
	 */
	var myVariable;
	console.log(myVariable); //결과 : undefined
	myVariable = 'hi?';
	console.log(myVariable); //결과 : 'hi?'


<br><br><br>

하지만, 아래의 코드의 경우 `Local Scope(지역 스코프) - Function Scope(함수 스코프)`의 범위에 의해 `Global Scope(전역 스코프)`에 있는 변수값을 참조 하는것이 아니라 함수 안에 있는 변수값을 참조 한다.

	var myVariable = 'hi?';
	function myFunction() {
		console.log(myVariable);// 결과 : undefined
		var myVariable = 'hello?';
		console.log(myVariable); // 결과 : 'hello?'
	}
	
	myFunction();


아래와 같이 자바스크립트의 Hoisting(호이스팅)에 의해 지역 변수를 참조 하게 된다.

	 var myVariable = 'hi?';
	 function myFunction() {
		var myVariable;
	 	console.log(myVariable);// 결과 : undefined
	 	myVariable = 'hello?';
	 	console.log(myVariable); // 결과 : 'hello?'
	 }
	
	 myFunction();


### 3. 함수 표현식(function expression)
---

함수 표현식(function expression)을 통해 함수를 정의하는 방법은 Hoisting(호이스팅) 되지 않는다. 

그 이유는 함수 표현식(function expression)을 통한 함수 정의 방법은 변수에 함수를 초기화시키기 때문에 선언문이 호이스팅이 되어 상단으로 올려진다 하더라도 함수가 아닌 변수로써 인지되기 때문이다.



	myFunction(); //ReferenceError: myFunction is not defined
	
	const myFunction = function () {
		console.log('hi?');
		return;
	}



<br><br><br><br>

참조 :

- https://medium.com/@khwsc1/%EB%B2%88%EC%97%AD-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%EC%BD%94%ED%94%84%EC%99%80-%ED%81%B4%EB%A1%9C%EC%A0%80-javascript-scope-and-closures-8d402c976d19
- https://www.zerocho.com/category/JavaScript/post/5741d96d094da4986bc950a0
- http://www.nextree.co.kr/p7363/
- http://asfirstalways.tistory.com/197
