const fs = require('fs');

function generateTalentCells() {
  const result = {};
  const rows = [];
  for (let row = 18, i = 1; row <= 205; row += 17, i++) {
    rows.push({ suffix: i, row });
  }

  for (const { suffix, row } of rows) {
    result[`battleTalent-1-${suffix}`] = `AY${row}`;
    result[`battleTalent-2-${suffix}`] = `BG${row}`;
    result[`normalTalent-${suffix}`] = `BQ${row}`;
  }

  return result;
}

const talents = generateTalentCells();
fs.writeFileSync('data/talent-cell-map.json', JSON.stringify(talents, null, 2), 'utf-8');
console.log('✅ talent-cell-map.json 생성 완료');
