let currentPage = 1;
let hasNext = true;

async function getItems(page = 1, size = 15){
    const params = new URLSearchParams({
        page,
        size
    });
    const queryString = params.toString();
    const url = queryString ? `/get-items?${queryString}` : `/get-items`;
    const data = await fetch(url,{
        method:'GET'
    });
    const json = await data.json();
    //console.log(json);
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

document.addEventListener('DOMContentLoaded', ()=>{
    //초기 1회 
    getItems();

});

window.addEventListener('scroll',()=>{
    // console.log('스크롤위치 :', window.pageYOffset);
    // console.log('스크롤위치 :', document.documentElement.scrollTop);
    // console.log('윈도우 높이',window.innerHeight)
    const scrollEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    if(scrollEnd){
        //console.log('현재페이지,',currentPage);
        getItems(++currentPage);
        //console.log('로딩후페이지,',currentPage);
    }
});

