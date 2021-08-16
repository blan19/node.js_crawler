import parse from 'csv-parse/lib/sync';
import fs from 'fs';

const csv = fs.readFileSync('csv/data.csv');
const records = parse(csv.toString('utf-8'));

export default records;
