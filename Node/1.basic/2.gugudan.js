function gugudan(){
    for(let i=2;i<=9;i++){
        console.log(`${i}단`)
        for(let j=1; j<=9;j++){
            console.log(`${i} x ${j} = ${j*i}`);
        }
    }
}

function gugudan2(){
    for(let i=0;i<=81;i++){
        console.log(`${(i)%9+2} x ${(i+1)/9+1}`);
    }
}
gugudan2();