const mongoose = require('mongoose')

function connect(url){
    mongoose.connect(url)
    .then(console.log('DAtabase connection established'))
    .catch((e)=>{console.log(e)})
}

module.exports = {connect};
    