# Minimize Change Detections
> angular 변경 감지의 최소화
> 

참고 : https://blog.angular.io/3-tips-for-angular-runtime-performance-from-the-real-world-d467fbc8f66e

참고 : https://angular.io/api/core/ChangeDetectorRef

참고 : https://alligator.io/angular/change-detection-strategy/

--------------------

angular는 사용자의 이벤트 또는 데이터가 변경 될때 모든 구성 요소에 대한 변경 감지를 수행합니다.

변화 감지를 통하여 효과적으로 구성 요소를 컨트롤 할 수 있지만, 프로젝트 크기가 거대해 지고, 복잡도가 상승할 수 록 이러한 변화 감지는 더욱 더 많은 작업을 수행 하게 되고, angular의 performance는 낮아지게 됩니다.

따라서 `ChangeDetectionStrategy.OnPush` 설정으로 변화 감지를 수동(?) 으로 조절 할 수 있습니다.  


### * 기본 템플릿 예시 

	import { Component } from '@angular/core';
	
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html'
	})
	export class AppComponent {
	  public _subject : any = ['수학', '과학', '국어'];
	
	  addSubject(subject : string) {
	    this._subject.push(subject);
	    return;
	  }
	}


위와 같은 예시 기본 템플릿을 `ChangeDetectionStrategy.OnPush` 설정 해 보도록 하였습니다.


### * 방법 1
 
 	import { Component, ChangeDetectionStrategy } from '@angular/core';
	
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  changeDetection: ChangeDetectionStrategy.OnPush
	})
	export class AppComponent {
	  public _subject : any = ['수학', '과학', '국어'];
	
	  addSubject(subject : string) {
	    this._subject = [...this._subject, subject];
	    return;
	  }
	}
	

### * 방법 2


  	import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
	
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  changeDetection: ChangeDetectionStrategy.OnPush
	})
	export class AppComponent {
	  public _subject : any = ['수학', '과학', '국어'];
	  
	  constructor(private _ngCdr: ChangeDetectorRef) {}
	  
	  addSubject(subject : string) {
	    this._subject.push(subject);
	    this._ngCdr.markForCheck();
	    return;
	  }
	}


### * 참고 

1. ChangeDetectionStrategy 기본값은  Default 입니다.
2. ChangeDetectorRef Methods
	- markForCheck() 앵귤러에 변화 감지를 시작해야 한다고 알립니다.
	- detach() 변화 감지를 비활성화 합니다.
	- reattach() 변화 감지 트리에 다시 연결 합니다.
	- detectChanges() 변화 감지를 한번 실행 합니다. detach()로 변화 감지가 비활성화 되어 있어도 DOM이 업데이트됩니다.
	- checkNoChanges() 변화 감지가 변경되지 않습니다. DOM을 업데이트해야한다고 결정하면 예외를 throw합니다.