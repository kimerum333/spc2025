const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const credentials = JSON.parse(fs.readFileSync('secrets/client_secret_124742568995-g5oq6honoc3r8mreqih25a02v4qm8805.apps.googleusercontent.com.json'));
const { client_id, client_secret, redirect_uris } = credentials.installed;

console.log('아이디',client_id, '씨크릿',client_secret, '리다렉',redirect_uris);

// OAuth 클라이언트 생성
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// 인증 범위
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

function getAccessToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('▶ 이 URL을 브라우저에 붙여넣으세요:\n', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('▶ 로그인 후 얻은 코드를 입력하세요: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code).then(({ tokens }) => {
      oAuth2Client.setCredentials(tokens);
      fs.writeFileSync('secrets/token.json', JSON.stringify(tokens));
      console.log('✅ 토큰이 token.json에 저장되었습니다.');
    }).catch(err => {
      console.error('❌ 토큰 가져오기 실패:', err);
    });
  });
}

getAccessToken();
