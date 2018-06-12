# Performance Improvements Scroll Handlers
> angular Scroll Handlers 성능 향상 시키기 
> 

참조 : https://medium.com/paramsingh-66174/catalysing-your-angular-4-app-performance-9211979075f6

참조 : https://angular.io/api/core/NgZone

* HostListener 사용한 scroll 사용 방식 
-------

	import { HostListener } from '@angular/core';

	@HostListener('window:scroll', ['$event']) onScrollEvent($event){
	    // do something...
	}


해당 방법을 사용시 윈도우 스크롤이 될때마다 이벤트를 아주 잘 받아 오게 된다.
또한, 손쉬운 방법으로 스크롤 이벤트를 활용 할 수 있다.
하지만, 이벤트가 너무 자주 트리거 되며, 스크롤 이벤트 함수 내부에서 
복잡한 DOM 작업을 수행 하는경우 성능에 나쁜 영향을 미칠 수 있다.


* Scroll Handlers 성능 향상 시키기 
-------


	import { AfterViewInit, NgZone } from '@angular/core';
	import { Observable } from 'rxjs';
	
    constructor(
        private _ngZone: NgZone,
    ){ ... }


    this._ngZone.runOutsideAngular(() => {
        Observable.fromEvent(window, 'scroll')
            .debounceTime(20)
            .subscribe(res => {
                console.log(res);
                // do something...
            });
    });



RxJS의 debounceTime을 사용한 스크롤 이벤트 방식은 사용자가 스크롤을 사용하고 debounceTime에 설정한 시간 만큼 이벤트를 정지 하게 되면 스크롤 핸들러를 트리거 하게 된다. 

위의 예시는 20ms 시간을 설정하여 사용자가 스크롤을 중지하고 20ms 이후 이벤트 트리거를 발생 시키며, 사용자 입장에서는 이전과 동일한 이벤트 경험을 느낄 수 있도록 한다. 

즉, 성능 향상 작업 이전에는 작은 스크롤 이벤트에도 반응하던 이벤트 핸들러는, 사용자가 스크롤을 중지하고 20ms 이후 이벤트 트리거를 발생하며, 사용자 경험은 이전과 동일한 효과를 얻을 수 있다.

또한, NgZone의 runOutsideAngular 함수를 통해 Angular 변경 감지를 트리거하지 않도록 한다. (물론, Angular의 오류 처리가 적용되는 작업을 수행 할 수 있다.) 이로서 Angular가 모든 스크롤에 대해 신경쓰는 일 (Angular의 모든 영역을 체크하는)이 없어 성능 향상에 도움이 된다.