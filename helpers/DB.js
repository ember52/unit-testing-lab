const mongoose = require('mongoose');

module.exports = async ()=>{
    console.log(process.env.MONGOURI)
    await mongoose.connect(process.env.MONGOURI || 'mongodb://127.0.0.1:27017/cloudUnitTest',
    {useNewUrlParser: true})
    .then(()=> console.log('DB connected'))
    .catch(err => console.error(err))
}

// const mongoose = require('mongoose');

// module.exports = async () => {
//     const uri = process.env.MONGOURI_TEST || 'mongodb://127.0.0.1:27017/cloudUnitTest'; // Use a separate URI for testing
//     await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('DB connected');
// }

// module.exports.closeDatabase = async () => {
//     await mongoose.disconnect();
// }
