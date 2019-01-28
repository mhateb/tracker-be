import express from 'express';

var models = require("./models");

//Sync Database
models.sequelize.sync().then(function() {

    console.log('Nice! Database looks fine')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});

const app = express();

app.get('/api/v1/test', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        test: 'test'
    })
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});