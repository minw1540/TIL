# background-image
> 사진을 이쁘게 띄워 보자! (프로필 사진과 같이)

- 변경전  
---

![Alt text](./exampleImg/background-image-before.png)

사진이 구겨저 보인다.

- 변경후
---

![Alt text](./exampleImg/background-image-after.png)

사자 친구가 가운데로 잘들어왔다.


- 변경 방식
---

`<img>` 가 아닌 `<div>`에 background-image 형식을 사용하며
그에 대한 옵션을 추가하였다.
	
	background-image : url('');
	background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
