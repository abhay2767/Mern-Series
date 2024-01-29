const fs = require('fs').promises;
const path = require('path')

const deleteimagefile = async(filepath)=>{
    try {
        await fs.unlink(filepath);
        // console.log("File deleted successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {deleteimagefile}