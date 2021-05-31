
const mongoose = require('mongoose')

const dbConfig = 'mongodb+srv://user:user@cluster0.3vy5y.mongodb.net/anotacoes?retryWrites=true&w=majority';


const conexcao = mongoose.connect(dbConfig, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

module.exports = conexcao;