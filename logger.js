const { mkdir, writeFileSync, createWriteStream, readFile, accessSync, constants: { F_OK, W_OK } } = require("fs")

class Logger {
    constructor(dir = '', prefix = 'logger', ext = 'log', header = "") {
        this.parentDir = dir
        this.prefixName = prefix
        this.extension = ext
        this.date = null
        this.header = header
        this.fileName = null
        this.writeStream = null
        this.init = () => {
            if (this.parentDir)
                if (!this.checkFileExists(this.parentDir))
                    mkdir(this.parentDir, { recursive: !0 }, (err) => {
                        if (err) console.info('Files created successfully')
                        else console.error(`Permission denied to create a file`)
                    })
        }
        this.init()
    }

    getCurrDate() {
        let cDate = new Date()
        return `${cDate.getFullYear()}-${(cDate.getMonth() + 1)}-${cDate.getDate()}`
    }

    getFilePath() {
        this.fileName = `${this.parentDir}/${this.prefixName + this.date}.${this.extension}`
        return this.fileName
    }

    writeLog(log) {
        var _self = this;
        try {
            readFile(_self.fileName, function (err, data) {
                if (!data) {
                    writeFileSync(_self.fileName, "");
                    _self.addingHeader(log)
                }else if (data.length == 0)
                    _self.addingHeader(log)
                else 
                    _self.appendLog(log)
            })
        } catch (error) {
            console.error(error);
        }
    }

    checkFileExists(file) {
        try {
            accessSync(file, F_OK);
            return true
        } catch (err) {
            console.error(err);
            return false
        }
    }

    addingHeader(data) {
        if (this.header) this.appendLog(this.header)
            this.appendLog(data)
    }
    
    appendLog(data) {
        try {
            if (!this.writeStream) 
                this.writeStream = createWriteStream(this.fileName, { 'flags': 'a' })
            if (typeof data === 'object') {
                let writeDate = Array.isArray(data) ? data : Object.values(data)
                writeDate.map((d) => {
                    this.writeStream.write(`${d}        `)
                })
                this.writeStream.write(`   \n`)
            } else
                this.writeStream.write(data + "\n")
        } catch (error) {
            console.error(error);
        }
    }

    log() {
        let getDate = this.getCurrDate()
        if (getDate === this.date) {
            this.appendLog(arguments)
        } else {
            if (this.writeStream) {
                this.writeStream.close()
                this.writeStream = null
            }
            this.date = this.getCurrDate()
            this.fileName = this.getFilePath()
            this.writeLog(arguments)
        }
    }
}

module.exports = Logger