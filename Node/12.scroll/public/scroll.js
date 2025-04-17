const REQUEST_PAGE_MANAGER={
    //서버로부터 받아온 마지막 페이지
    currentPage : 1,
    //서버에 한번에 요청할 아이템의 개수(페이지의 크기)
    pageSize : 20,
    //다음 페이지의 존재 여부
    hasNext : true,
    //다음 페이지 가져오기
    getItems: async function(){
        
        if(!this.hasNext){
            return;
        }

        const params = new URLSearchParams({
            page:this.currentPage+1,
            size:this.pageSize
        });
        const queryString = params.toString();
        const url = queryString ? `/get-items?${queryString}` : `/get-items`;
        const data = await fetch(url,{
            method:'GET'
        });
        const json = await data.json();

        //이건 아래의 렌더 매니저로 뺄 예정
        makeDivs(json);
    
        function makeDivs(json){
            const printPlace = document.getElementById('scroll-container');
            json.forEach(element => {
                console.log(element);
                let div = document.createElement('div');
                div.classList.add('item');
                div.innerHTML = element;
                printPlace.appendChild(div);
            });
        }
    }
}

const ITEM_STORAGE={
    CACHED_ITEMS : []
}    

const RENDER_PAGE_MANAGER={
    //화면에 최대로 띄울 수 있는 아이템의 수
    maxPageSize : 100,
    //서버로부터 다운받은 아이템들을 전부 저장해둔다.
    //현재 화면에 표시해야 할 아이템들의 인덱스.
    currentItemsIndex : [],
    //메모리에 페이지를 올린다.
    //알아서 현재 아이템 인덱스 갱신까지 한다.
    pushItems:function(items){
        items.forEach((element)=>{
            this.PAGE_MEMORY.push(element);
        });
    },
    organizeIndex:function(){
        //경우1 내려가면서 인덱스가 넘치면 위를 지워야 한다.
        //몇 개나 지워야 할 것인가?=>일단 페이지 사이즈만큼 하자.

        //경우2 올라가면서 인덱스가 넘치면 아래를 지워야 한다.
    }
    //메모리로부터 페이지를 리렌더

};

const ScrollStorage={
    
}

//이벤트 리스너
document.addEventListener('DOMContentLoaded', ()=>{
    //초기 1회 
    REQUEST_PAGE_MANAGER.getItems();

});

window.addEventListener('scroll',()=>{
    //console.log('(표준)스크롤바 위치 :', window.scrollY);
    // console.log('스크롤위치 :', document.documentElement.scrollTop);
    // console.log('윈도우 높이',window.innerHeight)
    //const scrollEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    if(scrollEnd){
        //console.log('현재페이지,',currentPage);
        //getItems(++currentPage);
        //console.log('로딩후페이지,',currentPage);
    }
});

