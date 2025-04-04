
function changeResult(delta){
    const result = document.getElementById("result");
    console.log(result.innerText);

    
    //let number = parseInt(result.innerText);
    let number = Number(result.innerText);

    //0이하로 안내려가게
    result.innerText = (number+delta<0)? 0:number+delta;
}