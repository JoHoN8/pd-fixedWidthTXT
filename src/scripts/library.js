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
            propsGood = false;
        }
        if (!String.prototype.repeat) {
            alert(constants.noStringRepet);
        }
        if (!Array.isArray(data)) {
            //not an array, it must be array
            return false;
        }
        let propsGood = true;
        data.some(item => {
            if (!item.fieldLength || !item.dataField) {
                propsGood = false;
                return true;
            }
        });
        return propsGood;
    }
    _createPadding(data, fieldLength) {
        let paddingToCreate = fieldLength - data.length;
        return " ".repeat(paddingToCreate);
    }
    _ensureString(data) {
        if (typeof data === 'number') {
            return data.toString();
        } else if (typeof data === 'string') {
            return data;
        } else {
            throw new Error(constants.invalidDataType);
        }
    }
    _createRow(rowObj) {

        let row = "";
        this.fileProps.forEach(prop => {
            let fieldData = this._ensureString(rowObj[prop.dataField]);
            let padding = this._createPadding(fieldData, prop.fieldLength);
            row += (padding + fieldData);
        });
        return row;
    }
    /**
     * Adds data to be placed in the generated file. Data should be an array of objects.
     * ensure the properties of the object match the dataField property of the constructor parimeter.
     * 
     * @param {object[]} data 
     */
    addData(data) {
        if (!this.fileData) {
            this.fileData = [];
        }
        this.fileData = this.fileData.concat(data);
    }
    /**
     * Generates the text file from the data that was provided to the addData method.
     * Once the file is generated it will prompt yoou for a filename and a location to save the file.
     * @param {string} fileName 
     */
    generateFile() {

        let fileDataPrepped = [];

        this.fileData.forEach(currentRow => {
            fileDataPrepped.push(this._createRow(currentRow));
        });

        let blobData = new Blob([fileDataPrepped.join("\r\n")], {type: "text/plain;charset=utf-8"});
        fileSaver.saveAs(blobData);
    }
 }
