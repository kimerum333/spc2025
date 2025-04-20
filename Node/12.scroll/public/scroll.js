const FETCHER = {
    async getItems(requestFrom, requestTo) {
        const params = new URLSearchParams({
            from: requestFrom,
            to: requestTo
        });
        const queryString = params.toString();
        const url = `/get-items?${queryString}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
}

// 로컬 메모리 저장소
const STORAGE = {
    requestSize: 20,
    maxPageSize: 100,

    lastStoredIndex: 0,
    lastIndex: null,
    cachedItems: [],

    currentIndexFrom: 0,
    currentIndexTo: 0,

    async toDownward() {
        this.currentIndexTo += this.requestSize;

        let diffrence = this.currentIndexTo - this.currentIndexFrom
        if (diffrence > this.maxPageSize) {
            this.currentIndexFrom = this.currentIndexTo - this.maxPageSize;
        }
        await this.checkAndFetch();
    },
    toUpward() {
        this.currentIndexFrom -= this.requestSize
        if (this.currentIndexFrom < 0) {
            this.currentIndexFrom = 0;
        }
        let diffrence = this.currentIndexTo - this.currentIndexFrom
        if (diffrence > this.maxPageSize) {
            this.currentIndexTo = this.currentIndexFrom + this.maxPageSize
        }
    },


    async checkAndFetch(){
        if(this.lastIndex!=null & this.currentIndexTo > this.lastIndex){
            this.currentIndexTo = this.lastIndex;
        }

        if(this.lastStoredIndex < this.currentIndexTo){
            let requestFrom = this.lastStoredIndex+1;
            let requestTo = requestFrom + this.requestSize;

            if(requestTo - requestFrom <= 0){
                return;
            }
            let jsonItems = await FETCHER.getItems(requestFrom, requestTo);

            for (item of jsonItems){
                this.cachedItems.push(item);
            }
        }
    }

}

// 화면에 아이템 출력하는 것을 담당.
const RENDERER = {
    //메모리로부터 페이지를 리렌더
    renderItems() {
        const printPlace = document.getElementById('item-container');
        printPlace.innerHTML = "";
        for (let i = Storage.currentIndexFrom; i <= Storage.currentIndexTo; i++) {
            let div = document.createElement('div');
            div.classList.add('item');
            div.innerHTML = Storage.cachedItems[i];
            printPlace.appendChild(div);
        }
    }
};

const SCROLL_MANAGER = {
    async handleScrollDown(){
        await STORAGE.toDownward();
        RENDERER.renderItems();
    },
    handleScrollUp(){
        STORAGE.toDownward();
        RENDERER.renderItems();
    }
}

//이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    //초기 1회 
    REQUEST_PAGE_MANAGER.getItems();

});

window.addEventListener('scroll', () => {
    //console.log('(표준)스크롤바 위치 :', window.scrollY);
    // console.log('스크롤위치 :', document.documentElement.scrollTop);
    // console.log('윈도우 높이',window.innerHeight)
    //const scrollEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    if (scrollEnd) {
        //console.log('현재페이지,',currentPage);
        //getItems(++currentPage);
        //console.log('로딩후페이지,',currentPage);
    }
});

