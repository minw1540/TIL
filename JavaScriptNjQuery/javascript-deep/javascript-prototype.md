# Prototype

>
> Prototype = 원형, 원기 
>

JavaScript는 Class가 없는 프로토타입 기반 언어 이다.

프로토타입 기반 언어란 기존의 객체를 복사하여(cloning) 새로운 객체를 생성하며, 객체 원형인 프로토타입을 이용하여 새로운 객체를 만들어낸다.

이렇게 생성된 객체 역시 또 다른 객체의 원형이 될 수 있다. 
프로토타입은 객체를 확장하고 객체 지향적인 프로그래밍을 할 수 있게 해준다.

최근의 ECMA6 표준에서는 Class 문법이 추가되었지만 문법이 추가 된것이지 
자바스크립트가 클래스 기반으로 바뀌었다는 것은 아니다.

## Prototype Object와 Prototype Link

>
> Prototype = Prototype Object + Prototype Link
>

<br/>
### 1. Object

JavaScript에서는 기본 데이터 타입인 boolean, number, string, 그리고 특별한 값인 null, undefined 빼고는 모두 객체이다. 사용자가 정의한 함수도 객체이고, new라는 연산자를 통해 생성된 것도 객체이다.

<br/>
### 2. Prototype Object

>
> 객체는 언제나 Function(함수)로 생성된다.
>





