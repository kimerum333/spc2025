const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

// JSON 데이터 로드
const sheetsJson = JSON.parse(fs.readFileSync('data/sheets.json'));
const version1Map = JSON.parse(fs.readFileSync('data/cell-map.json'));
const version2Map = JSON.parse(fs.readFileSync('data/cell-map-v2.json'));

// Google API 인증
const credentials = JSON.parse(fs.readFileSync('secrets/client_secret_124742568995-g5oq6honoc3r8mreqih25a02v4qm8805.apps.googleusercontent.com.json'));
const token = JSON.parse(fs.readFileSync('secrets/token.json'));
const { client_id, client_secret, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(token);
const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

// 유틸: sleep
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// 정규식 패턴: '캐릭터명(플레이어명)'
const characterSheetPattern = /^[^()]+?\([^()]+?\)$/;

// 시트 이름 가져오기
async function getCharacterSheetNames(spreadsheetId) {
    const res = await sheets.spreadsheets.get({ spreadsheetId });
    return res.data.sheets
        .map(s => s.properties.title)
        .filter(title => characterSheetPattern.test(title));
}

//데이터 로드 공통함수
async function readWithMap(sheetId, sheetName, cellMap) {
    const ranges = Object.values(cellMap).map(cell => `${sheetName}!${cell}`);
    const res = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: sheetId,
        ranges,
    });

    const valueRanges = res.data.valueRanges;
    const data = {};
    Object.keys(cellMap).forEach((key, idx) => {
        data[key] = valueRanges[idx]?.values?.[0]?.[0] ?? null;
    });

    return data;
}

// 데이터 읽기
async function readCharacterData(sheetId, sheetName) {
    const dataV1 = await readWithMap(sheetId, sheetName, version1Map);
    const isFallbackNeeded = !dataV1["playerName"];

    if (!isFallbackNeeded) {
        return { ...dataV1, version: 'v1' };
    }

    await sleep(800); // API 요청 간 간격
    const dataV2 = await readWithMap(sheetId, sheetName, version2Map);
    return { ...dataV2, version: 'v2' };
}

// 즉시 jsonl 출력
function appendToJsonl(data, outputPath) {
    fs.appendFileSync(outputPath, JSON.stringify(data) + '\n');
}

// 메인 로직
async function readAllCharacterSheets() {
    const outputPath = path.resolve('data/output.jsonl');
    fs.writeFileSync(outputPath, ''); // 기존 내용 초기화

    for (const sheetEntry of sheetsJson) {
        const [sheetType, sheetId] = Object.entries(sheetEntry)[0];
        const sheetNames = await getCharacterSheetNames(sheetId);

        for (const sheetName of sheetNames) {
            try {
                const characterData = await readCharacterData(sheetId, sheetName);
                const record = {
                    sheetType,
                    sheetId,
                    sheetName,
                    ...characterData,
                };

                appendToJsonl(record, outputPath);
                console.log(`✅ 저장됨: ${sheetType} - ${sheetName}`);
            } catch (err) {
                console.error(`❌ 실패: ${sheetType} - ${sheetName} →`, err.message);
            }

            await sleep(800); // API 요청 간 간격
        }

        await sleep(800); // 문서 간 간격도 살짝
    }

    console.log('🎉 모든 시트 처리 완료. → output.jsonl');
}

readAllCharacterSheets().catch(console.error);