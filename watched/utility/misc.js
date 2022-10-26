const fs = require('fs');

module.exports = {
    sendFile: (res, path) => {
        let fileStream = fs.createReadStream(path);
        res.setHeader("Content-Type", "text/javascript");
        fileStream.pipe(res);
    }
}