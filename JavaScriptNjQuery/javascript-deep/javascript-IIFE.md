# 자바스크립트 IIFE (즉시실행함수)
--

### first-class object의 자바스크립트 함수
---

- 변수에 저장 할 수 있다.
- 함수에 parameter를 전달 할 수 있다.
- 힘수의 return값을 사용 할 수 있다.
- 자료 구조에 저장 할 수 있다.


### 함수 선언식(function declaration)과 함수 표현식(function expression)
---

##### 1. 함수 선언식(function declaration)

	function myFunction() {
		console.log('hi?');
		return;
	}

함수 선언식(function declaration)으로 함수가 선언되면 해당 함수가 스코프 최상단으로 Hoisting(호이스팅)되어 함수 선언의 위치와는 상관없이 소스 내 어느 곳에서든지 호출이 가능하다.

<br>
##### 2. 함수 표현식(function expression)

	const myFunction = function () {
		console.log('hi?');
		return;
	}

함수 표현식(function expression)을 통해 함수를 정의하는 방법은 Hoisting(호이스팅) 되지 않으며, 런타임시 변수의 값이 할당 되고 실행된다.

<br>
함수 선언식(function declaration)을 너무 많이 사용 하게 될 경우 자바스크립트의 인터프리터가 너무 많은 코드를 VO(variable object)에 저장하므로 애플리케이션의 응답속도는 현저히 떨어질 수 있으므로 주의가 필요하다.

<br>
### Immediately-invoked function expression (즉시실행함수)
---

	(function () {
		console.log('hi?');
	})();


- 정의되자마자 즉시 실행되는 Javascript Function 를 말한다. (선언과 동시에 실행됨 - 함수 호출 x)
- Self-Executing Anonymous Function 으로 알려진 디자인 패턴이다.
- 첫 번째는 괄호((), Grouping Operator)로 둘러싸인 익명함수(Anonymous Function)이다.
- 두 번째 괄호는 즉시 실행 함수를 생성하는 괄호()이다. 이를 통해 자바스크립트 엔진은 함수를 즉시 해석해서 실행한다.
- **전역 스코프에 불필요한 변수를 추가해서 오염시키는 것을 방지할 수 있다.**



##### 1. 외부 접근을 통제 할 수 있다.

	
	/**
	 * 'text' 변수에 대한 외부 접근을 허용 하되,
	 * 직접적은 접근은 불가능 하게 한다. (변수 보호 가능)
	 */
	const myFunction = (function () {
		var text = 'hi?';
		return {
			value : text,
		}
	})();
	
	console.log(myFunction.text);// 결과 : undefined
	console.log(myFunction.value);// 결과 : 'hi?'
	
	/**
	 * 'text' 변수에 대한 외부 접근을 불가능 하게 한다.
	 */
	(function () {
		var text = 'hi?';
		return {
			value : text,
		}
	})();


즉시실행함수는 외부에서 함수 내의 변수에 접근할 경우 이를 통제할 수 있으며, 글로벌 네임스페이스에 변수를 추가하지 않아도 되기 때문에 코드 충돌이 없이 구현할 수 있어 플러그인이나 라이브러리 등을 만들 때 많이 사용된다.


<br>
##### 2. parameter 전달 방법


	(function (text) {
		console.log(text);//결과 : 'hi?'
		return;
	})('hi?');

전달한 parameter값의 코드 충돌, overwritting을 방지 할 수 있다.

<br>
##### 3. IIFE(즉시실행함수)와 Closure(클로저)함수

	let outer = (function (startNum) {
		let shareCount = startNum;
	
		return function () {
			let count = 0;
	
			return {
				increase : function () {
					return {
						count : ++count,
						shareCount : ++shareCount
					}
				},
				decrease : function () {
					return {
						count : --count,
						shareCount : --shareCount
					}
				}
			};
		}
	})(100);
	
	let counter1 = outer();
	console.log(counter1.increase());//결과 : { count: 1, shareCount: 101 }
	console.log(counter1.increase());//결과 : { count: 2, shareCount: 102 }
	
	let counter2 = outer();
	console.log(counter2.increase());//결과 : { count: 1, shareCount: 103 }
	console.log(counter2.decrease());//결과 : { count: 0, shareCount: 102 }


Closure(클로저)함수를 통한 개별 스코프 생성으로 각기 다른 `count`값과 IIFE 함수를 통해 전달 받은 parameter값을 통한 공유된 `shareCount`값이다.


<br><br><br>

참고 :

- https://developer.mozilla.org/ko/docs/Glossary/IIFE
- http://www.nextree.co.kr/p4150/
- http://devyj.tistory.com/9

