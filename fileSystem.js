import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from "url";
import readline from 'readline';


const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


r1.question('Please enter the directory path: ', async(directoryPath) => {
    let directoryFiles = await fsp.readdir(directoryPath);
    for (const fileName of directoryFiles) {
        let fileParts = fileName.split(".");
        if (fileParts.length > 1) {
            let fileExtension = fileParts[1];
            if (fs.existsSync(path.join(directoryPath, fileExtension))) {
                fsp.rename(path.join(directoryPath, fileName), path.join(directoryPath, fileExtension, fileName));
                fs.appendFileSync('summary.txt', `The folder ${fileExtension} is created to summary.txt\n`)
            } else {
                fs.mkdirSync(path.join(directoryPath, fileExtension));
                fsp.rename(path.join(directoryPath, fileName), path.join(directoryPath, fileExtension, fileName));
                fs.appendFileSync('summary.txt', `The file ${fileName} is added to summary.txt\n`)
            }
        }
    }


    r1.close();
})
