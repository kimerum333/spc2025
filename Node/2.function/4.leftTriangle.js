const ROWS = 5;

function leftTriangle(){
    let currentRow = 1;
    while(currentRow <= ROWS){
        let stars = "";
        let starCount = 1;
        while(starCount<=currentRow){
            stars += "*";
            starCount++;
        }
        console.log(stars);
        currentRow++;
    }
}

leftTriangle();

function leftInvertedTriangle(){
    let currentRow = 1;
    while(currentRow <= ROWS){
        let stars = "";
        let starCount = ROWS;
        while(starCount<=currentRow){
            stars += "*";
            starCount--;
        }
        console.log(stars);
        currentRow++;
    }
}

leftInvertedTriangle();
