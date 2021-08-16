import xlsx from 'xlsx';
import axios from 'axios';
import cheerio from 'cheerio';

const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.영화목록;
const records = xlsx.utils.sheet_to_json(ws);

/**
 * for of 문과 await를 같이 쓰면 순서는 보장 대신 속도 비교적 느리다
 * Promise.all은 순서 보장 x 대신 요청을 동시에 함으로 속도가 빠르다
 */

const crawler = async () => {
  await Promise.all(
    records.map(async (item) => {
      const res = await axios.get(item.링크);
      if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        const text = $('.score.score_left .star_score').text();
        console.log(item.제목, '평점', text.trim());
      }
    }),
  );
};

export default crawler;
