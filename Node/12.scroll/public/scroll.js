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
        if(this.lastIndex && this.currentIndexTo > this.lastIndex ){
            this.currentIndexTo = this.lastIndex;
        }

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

    async checkAndFetch() {
        if (this.lastStoredIndex < this.currentIndexTo) {
            let requestFrom = (this.lastIndex == null) ? 0 : this.lastStoredIndex;
            let requestTo = requestFrom + this.requestSize;

            if (requestTo - requestFrom <= 0) {
                return;
            }
            let jsonItems = await FETCHER.getItems(requestFrom, requestTo);

            for (item of jsonItems.items) {
                this.cachedItems.push(item);
            }
            this.lastIndex = jsonItems.lastIndex;
            this.lastStoredIndex = requestTo;
        }
    },
}

// 화면에 아이템 출력하는 것을 담당.
const RENDERER = {
    //메모리로부터 페이지를 리렌더
    renderItems() {
        const printPlace = document.getElementById('item-container');
        printPlace.innerHTML = "";
        for (let i = STORAGE.currentIndexFrom; i < STORAGE.currentIndexTo; i++) {
            console.log(`in renderItems, i = ${i}, from = ${STORAGE.currentIndexFrom}, to = ${STORAGE.currentIndexTo}`)
            let div = document.createElement('div');
            div.classList.add('item');
            div.innerHTML = STORAGE.cachedItems[i];
            printPlace.appendChild(div);
        }
    }
};

const SCROLL_MANAGER = {
    async handleScrollDown() {
        // console.log('down호출됨');
        await STORAGE.toDownward();
        RENDERER.renderItems();
    },
    handleScrollUp() {
        // console.log('up호출됨');
        STORAGE.toUpward();
        RENDERER.renderItems();
    }
}

//이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    //초기 1회
    SCROLL_MANAGER.handleScrollDown();
});


const READY = true;
const WAITING = false;
let scrollStatus = READY;
window.addEventListener('scroll', () => {
    if(scrollStatus == WAITING){
        return;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        SCROLL_MANAGER.handleScrollDown();
        scrollStatus = WAITING;
        waitScroll()
        return;
    }
    if (window.scrollY === 0) {
        SCROLL_MANAGER.handleScrollUp();
        waitScroll()
        return;
    }

    function waitScroll(){
        scrollStatus = WAITING;
        setTimeout(() => {
            scrollStatus = READY;
        }, 500);
    }
});

