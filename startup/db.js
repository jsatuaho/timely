const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost:27017/timely',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })   
    .then(() => console.log('Connected to MongoDB'))
    .catch( err => console.log(err) );
}