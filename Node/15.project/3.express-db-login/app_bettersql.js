const sqlite = require('app_sqlite.js');

//디비 세팅
const db = sqlite('users.db');

//로긴함수
function isPasswordCorrect(username, password){
    console.log('using bettersql');

    let selectQ = db.prepare(`SELECT password FROM users WHERE username = ?`);

    let result = selectQ.get(username);
    //console.log(result);

    if (!result) {
        return false; // 유저 없음
        db.close();
    }
    if(result.password==password){
        return true;
        db.close();
    }else{
        return false;
        db.close();
    }
}

module.exports={
    isPasswordCorrect
}

//console.log(login('user1','password1'));

//console.log(login('user1','password2'));
