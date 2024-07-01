import fs from 'fs';
import path from 'path';
import moment from 'moment';


function saveToFileByDate(jsonString, dirPath, fileName) {
    const date = moment().format('YYYY-MM-DD');
    const filePath = path.join(dirPath, `${date}-${fileName}.json`);
    fs.writeFileSync(filePath, jsonString);
    
}

export { saveToFileByDate }
