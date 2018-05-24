# onMouseWheel Event
> mouseWheel event 사용 하기
> 
> mouseWheel을  상,하 로 움직일시 해당 element를 좌,우 로 스크롤하기!
> 
> jQuery 사용.

* Html
-------

	<div #elem (mousewheel)="OnMouseWheel($event, elem)">
		<!-- some elements-->
		<!-- some elements-->
		<!-- some elements-->
	</div>



* mouseWheel Event 형식 (.ts)
-------

    OnMouseWheel(event : any, elem : HTMLElement){

        if(typeof event === 'undefined'){
            return;
        }

        if(typeof elem === 'undefined'){
            return;
        }
		
		//상, 하로 마우스 휠을 움직일시 적용
        if(event.wheelDelta !== 0 && event.wheelDeltaX === 0 && event.wheelDeltaY !== 0){

            event.stopPropagation();
            //Do Something...
            return false;
        }

        return;
    }



* + 해당 element 좌,우 로 스크롤 하기 (.ts)
-------

    OnMouseWheel(event : any, elem : HTMLElement){

        if(typeof event === 'undefined'){
            return;
        }

        if(typeof elem === 'undefined'){
            return;
        }

		//상, 하로 마우스 휠을 움직일시 적용
        if(event.wheelDelta !== 0 && event.wheelDeltaX === 0 && event.wheelDeltaY !== 0){

            event.stopPropagation();
            // jQuery를 사용하여 해당 element의 스크롤을 좌, 우로 움직여 준다.
            $(Elem).scrollLeft($(Elem).scrollLeft() + event.wheelDelta);
            return false;
        }

        return;
    }
 
