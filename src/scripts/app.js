/**
    app name fixedWidthTXT
 */

 /**
  * Class to create a fixed width text file
  * 
*/
let fileSaver = require("file-saver");
import * as constants from './constants';
 export class fileGenerator {
    /**
     * When initializing a new instance of this class fileConfig is required.
     * fieldLength is the total length of the entry for that item
     * dataField will be used to identify what property to use from the data that is added to generate the file
     * data in each row of the file will be in the order you pass here
     * @param {{fieldLength: number, dataField: string}[]} fileConfig 
    */
    constructor(fileConfig) {
        
        let configGood = fileGenerator.checkInitConfig(fileConfig);
        if (configGood === false) {
            throw new Error(constants.incorrectFileProps);
        }
        this.fileProps = fileConfig;
    }
    static checkInitConfig(data) {
        try {
            var isFileSaverSupported = !!new Blob;
        } catch (e) {
            alert(constants.noBlobError);
        }
        if (!Array.isArray(data)) {
            //not an array, it must be array
            return false;
        }
        let propsGood = true;
        data.some(item => {
            if (!item.fieldName || !item.fieldLength || !item.dataSource) {
                propsGood = false;
                return true;
            }
        });
        return propsGood;
    }
    _createPadding(data, fieldLength) {
        let paddingToCreate = fieldLength - data;
        return " ".repeat(paddingToCreate);
    }
    _createRow(rowObj) {

        let row = "";
        this.fileProps.forEach(prop => {
            let fieldData = rowObj[prop.dataField];
            let padding = this._createPadding(fieldData, prop.fieldLength);
            row += (padding + fieldData);
        });
        return row;
    }
    addData(data) {
        if (!this.fileData) {
            this.fileData = [];
        }
        this.fileData = this.fileData.concat(data);
    }
    generateFile(fileName) {

        let fileDataPrepped = [];

        this.fileData.forEach(currentRow => {
            fileDataPrepped.push(this._createRow(currentRow));
        });

        let blobData = new Blob([fileDataPrepped.join("/r/n")], {type: "text/plain;charset=utf-8"});
        fileSaver.saveAs(blobData, `${fileName}.txt`);
    }
 }
