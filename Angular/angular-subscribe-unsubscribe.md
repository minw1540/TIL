# Angular subscribe(구독) 과 unsubscribe(구독 취소 )

> angular에서 간단한 subscribe와 unsubscribe 하기 

* 참고 : http://web-front-end.tistory.com/71?category=666763


RxJs에서는 Observable를 구독(subscribe) 함으로서 스트림을 통해 데이터를 주고 받고 더 이상 스트림을 통한 데이터가 필요치 않을 경우 메모리 관리를 위하여  구독취소(unsubscribe)를 해야한다.


### - 구독 하기 (subscribe)
-----------------------

1. import { Observable } from 'rxjs';

	`example.service.ts`

		/*core*/
		import { Injectable } from '@angular/core';
		import { Subject } from 'rxjs/Subject';
		import { Observable } from 'rxjs';



2. Subject 변수 선언

	`example.service.ts`
	
		@Injectable()
		export class AlertService {
		
		    private _Subject = new Subject<any>(); //Subject
		
		    constructor() {}
		
		    // Do SomeThing...
		}


3. data 변경사항 멀티 캐스팅 하기
	
	`example.service.ts`
			
		onChangeData(message: any) {
		    this._message = _message;
		    this._Subject.next(<any> this._message);
		    return;
		}
		

4. data 구독 함수 만들기 

	`example.service.ts`
	
	    getData() : Observable<any> {
	        return this._Subject.asObservable();
	    } 


5. 구독 하기 

	`example.component.ts`
	

        this.exampleSubscribe = this._exampleService.getData()
		    .subscribe((r_data) => {
		        console.log(r_data);
		        return;
		    });




### - 구독 취소 하기 (unsubscribe)
-----------------------

component가 종료되거나 더이상 스트림 데이터가 필요치 않을 경우 구독을 취소 해야 한다. 그렇지 않으면 메모리 낭비와 로직의 꼬임을 경험 할 수 있다.

	//component 종료시 구독 취소 
    ngOnDestroy(){
        this.exampleSubscribe.unsubscribe();
        return;
    }




### - 구독 취소의 다양한 방법 

1. take(number)

number 번 실행 이후 구독취소 (unsubscribe) 된다.



	this._exampleService.getData()
	    .take(1)//1번 이후 자동 구독 취소 
	    .subscribe((r_data) => {
	        console.log(r_data);
	        return;
	    });


2. takeWhile()

while문과 마찬가지로 takeWhile()문이 true일 경우에만 구독됩니다.

	
	
	ngOnInit() {
	    this._exampleService.getData()
	        .takeWhile(() => this.needSubscribe)
	        .subscribe((r_data) => {
	            console.log(r_data);
	            return;
	        });
	    return;
	}
	
	ngOnDestroy() {
	    this.needSubscribe = false;
	}
	



### - 구독 취소의 예외 사항

Angular의 Pipe(파이프) 경우 내부적으로 subscribe(구독)과 unsubscribe(구독취소) 자동적으로 처리 합니다.

예를 들어 Pipe에서         `this.exampleSubscribe.unsubscribe();` 선언시 오류를 발생합니다.



