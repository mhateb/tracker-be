import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import errorHandler from 'errorhandler';
import path from 'path'

import models from "./models";
import routes from './routes'

const app = express();
const PORT = 5000;
const isProduction = process.env.NODE_ENV === 'production';

models.sequelize.sync()
    .then(function() {
        console.log('Nice! Database looks fine')
    })
    .catch(function(err) {
        console.log(err, "Something went wrong with the Database Update!")
    });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

require('./models/user');
require('./config/passport');
app.use(routes);

if (!isProduction) {
    app.use(errorHandler());
}

if (!isProduction) {
    app.use((req, res, err) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
} else {
    app.use((req, res, err) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});