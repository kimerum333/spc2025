const fs = require('fs');
const { google } = require('googleapis');

// 인증 객체 생성
const credentials = JSON.parse(fs.readFileSync('client_secret_124742568995-g5oq6honoc3r8mreqih25a02v4qm8805.apps.googleusercontent.com.json')); // 네 파일명 그대로
const token = JSON.parse(fs.readFileSync('token.json'));

const { client_id, client_secret, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(token);

// Sheets API 클라이언트 생성
const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

// 스프레드시트 ID와 범위 설정
const spreadsheetId = '10xg1s5-lLHfaeha-HSNB9I0Kk21B-50I7eT-xzLSIyk';
const range = 'sheet1!B2'; // 시트 이름과 셀 주소

async function readCell() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('🔍 결과 없음');
  } else {
    console.log('📄 B2 셀 값:', rows[0][0]);
  }
}

readCell().catch(console.error);
