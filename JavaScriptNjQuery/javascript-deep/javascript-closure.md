# 자바스크립트 Closure(클로저)

### 1. Closure(클로저) 란?
---

- 무언가의 내부 함수 + Lexical scope(렉시컬 스코프)
- 자바스크립트에서 클로저는 함수가 생성되는 시점에 생성된다.(렉시컬 환경을 포섭하여 실행됨)
- 외부에서 내부 변수에 접근할 수 있도록 하는 함수로 해당 내부 변수는 하나의 Closure(클로저)에 종속되지 않고 외부 함수가 실행 될 때마다 새로운 유효범위 체인과 새로운 내부 변수를 생성
- Closure(클로저)가 참조하는 내부 변수는 실제 내부 변수의 복사본이 아닌 그 내부 변수를 직접 참조
- Closure(클로저)는 3가지 스코프 체인을 지님 (전역 변수 > 외부 함수의 변수 > 자기 자신의 변수)
- 외부 함수가 종료되더라도 내부함수가 실행되는 상태면 내부함수에서 참조하는 외부함수는 닫히지 못하고 내부함수에 의해서 닫히게 되어 클로저라 불림
<br><br>


### 2. Closure(클로저)의 기본 구조
---

> - Closure(클로저)가 아닌 내부 함수 : 
>
> `inner()`함수는 `outer()`의 안에 있고, 렉시컬 스코프 체인을 통해 `outer()`의 `text` 변수에 접근 가능하지만
> `outer()` 함수에 정의되고 실행될뿐 `outer()`의 밖으로 나 올수 없기 때문에 `Closure(클로저)가 아니다`.
> 


		function outer() {
			var text = 'hi?';
		
			function inner() {
				console.log(text);
				return;
			}
		
			inner();
			return;
		}
		
		outer();


<br><br>
>
> - Closure(클로저) 함수
> 
> 1. `inner()`함수는 `outer()` 안에 정의되어 있고 `text` 변수에 접근 가능하다.
> 2. `inner()`함수는 global의 `call`이라는 이름으로 할당되었다.
> 3. global에서 `inner()`함수를 `call`이라는 이름으로 호출하였다.
> 4. `inner()`함수는  `outer()`에 있는 `text` 변수를 출력한다.
> 
> 즉, `inner()`함수는 자신이 생성된 Lexical scope(렉시컬 스코프)를 벗어나 `global`에서 
> `call`이라는 이름으로 호출되었고, 현재 호출된 Global Scope(전역 스코프)가 아닌 
> `outer()`의 스코프를 통해 진행되었다.
>
> (내가 해외에 살고있고, 한국 김치찌개가 먹고 싶어서 한국에 계신 어머님께 김치를 부탁하여 해외배송으로
>  김치를 받고 그걸로 해외에 있는 내 집에서 김치찌개를 만들어 먹은 느낌????)


	function outer() {
		var text = 'hi?';
	
		function inner() {
			console.log(text);
			return;
		}
	
		return inner;
	}
	
	var call = outer();
	call();


또한, `outer()`함수의 인스턴스는 `var call = outer();` 해당 수행이 끝난 후 `Garbage Collector (CG)`에 의해
사라져야 하지만 `call (inner())`가 `outer()`의 Lexical scope(렉시컬 스코프)를 참조하고 있어 사라지지 않는다.

<br>

### 3. Closure(클로저) 활용
---

서로다른 Closure(클로저) `increase()`와 `decrease ()`가 동일한 `counter` 변수를 참조한다. (동일 스코프)

	function outer() {
		let count = 0;
	
		return {
			increase : function () {
				return ++count;
			},
			decrease : function () {
				return --count;
			}
		};
	}
	
	let counter = outer();
	console.log(counter.increase());//결과 : 1
	console.log(counter.increase());//결과 : 2
	console.log(counter.decrease());//결과 : 1


<br>
같은 함수를 사용하지만 `counter1` 과 `counter2`는 서로 다른 스코프를 형성한다.

	function outer() {
		let count = 0;
	
		return {
			increase : function () {
				return ++count;
			},
			decrease : function () {
				return --count;
			}
		};
	}
	
	let counter1 = outer();
	console.log(counter1.increase());//결과 : 1
	console.log(counter1.increase());//결과 : 2
	console.log(counter1.decrease());//결과 : 1
	
	let counter2 = outer();
	console.log(counter2.decrease());//결과 : -1
	console.log(counter2.increase());//결과 : 0
	console.log(counter2.increase());//결과 : 1


<br><br>
`outer()`가 `counter1`과 `counter2`로 호출될때 각각 `baseNum`의 인자 값으로 `5`와 `2`를 넘겨주었다.

`counter1`과 `counter2`는 서로다른 스코프를 형성하기 때문에 `count`변수에는 각각 `5`와 `2`가 할당된다.

`outer()`함수의 인스턴스는 함수 호출이후 `CG`에 의해 회수 되어야 하지만, `counter1`과 `counter2` 가 `outer()`의 Lexical scope(렉시컬 스코프)를 참조하고 있어 사라지지 않는다.

그러므로, `counter1`과 `counter2`는 각각 기본값 `5`와 `2`를 사용하여 증감을 하게 된다.


	function outer(baseNum) {
		let count = baseNum;
	
		return {
			increase : function () {
				return ++count;
			},
			decrease : function () {
				return --count;
			}
		};
	}
	
	let counter1 = outer(5);//count = 5
	console.log(counter1.increase());//결과 : 6
	console.log(counter1.increase());//결과 : 7
	console.log(counter1.decrease());//결과 : 6
	
	let counter2 = outer(2);//count = 2
	console.log(counter2.decrease());//결과 : 1
	console.log(counter2.increase());//결과 : 2
	console.log(counter2.increase());//결과 : 3
	

<br><br>


0~9까지 순차적으로 출력하고 싶었으나, `10`만 출력된다.

`setTimeout`의 인자인 `익명함수`는 `0.1s` 이후 실행된다. `0.1s` 이후 돌아온 `익명함수`는 자신의 스코프에서 
`ii`의 값을 찾고 자기 자신에게 `ii`가 없기 때문에 `counter()`함수에 있는 `ii`를 참조한다.

하지만 `0.1s`이후에는 `ii`의 값이 이미 `10`이 되어 있고 `익명함수`는 해당 `ii`의 값인 `10`을 출력한다.


	function counter() {
		for(var ii = 0; ii < 10; ii++){
			setTimeout(function() {
				console.log(ii);
			}, 100);
		}
	}
	
	counter();//결과 : 10, 10, ... 10

<br><br>
>
> - ES6에서 추가된 블록 스코프를 이용하는 방식
>
> `var`는 Function-Level Scope이기 때문에 `counter()`의 스코프 안에 존재한다.
> 
> 하지만, `let`의 경우 Block-Level Scope이기에 의도했던 올바른 값을 출력한다.


	function counter() {
		for(let ii = 0; ii < 10; ii++){
			setTimeout(function() {
				console.log(ii);
			}, 100);
		}
	}
	
	counter();//결과 : 0 ~ 9


<br><br>
>
> - Closure(클로저)를 사용하여 새로운 스코프를 추가하는 방식 
>
> `IIFE`를 사용하여 `setTimeout`의 익명함수를 클로저로 만들어 사용한다.
> 
> `IIFE`에 `ii`값을 넘겨주고 `ii`값은 `num`의 인자값이 되어 각기 다른 새로운 스코프를 생성하고 반환한다.
> 


	function counter() {
		for(var ii = 0; ii < 10; ii++){
	
			(function (num) {
				setTimeout(function() {
					console.log(num);
				}, 100);
			})(ii);
		}
	}
	
	counter();//결과 : 0 ~ 9
	
	

### 4. Closure(클로저)의 단점
---

- 메모리를 소모하며, 메모리 누수를 가속하는 위험이 있다.

외부 함수가 종료되더라도 내부함수가 실행되는 상태면 내부함수에서 참조하는 외부함수는 닫히지 못하고 내부함수에 의해서 닫히게 됨으로 `CG`에 의해 스코프가 회수되지 않아 메모리가 남아 있게된다.

	//해당 방식으로 Closure(클로저) 참조를 제거 할 수 있다.
	
	function outer() {
		let count = 0;
	
		return {
			increase : function () {
				return ++count;
			},
			decrease : function () {
				return --count;
			}
		};
	}
	
	let counter = outer();
	counter = null; // Closure(클로저) 참조를 제거
	

<br>

- 새로운 스코프를 생성하는 비용과 스코프 체인을 검색에 따른 퍼포먼스 감소

스코프 체인에 추가되는 스코프 때문에 퍼포먼스의 손해가 있을 수 있다. Closure(클로저)로 선언된 global 변수에서 Closure(클로저) 상위의 함수의 변수값에 접근하고자 할 때 Closure(클로저)의 스코프를 먼저 지나 상위로 탐색하는 비용이 발생한다.

(`call` -> `inner()` -> `outer()` -> `outer() 변수`)

스코프 체인이 몇개 안되면 상관없지만 쌓이다 보면 퍼포먼스의 손해를 볼 수 있다.





