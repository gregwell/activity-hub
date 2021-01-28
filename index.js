import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors'
import activitiesRoutes from './routes/activities.js';
import userRoutes from './routes/users.js';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRoutes, activitiesRoutes);

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use(morgan('combined'));

app.use('/activities', activitiesRoutes);
app.use('/users', userRoutes);

const CONNECTION_URL = `mongodb+srv://user:${process.env.MONGO_PASSWORD}@cluster0.7soo3.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true} )
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);