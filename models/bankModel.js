import fs from 'fs'
import { filePath } from '../utils/dataFilePath.js'

const readBankFromFile = () => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData)
    } catch (error) {
        throw new Error("Error reading from bank file")
    }
}

const writeBankToFile = (bank) => {
    try {
        fs.writeFileSync(filePath,JSON.stringify(bank), 'utf-8')
    } catch (error) {
        throw new Error("Error writing to the bank file")
    }
}

export {readBankFromFile, writeBankToFile}