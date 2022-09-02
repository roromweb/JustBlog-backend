import chalk from 'chalk';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { NODE_ENV, DB_HOST, DB_NAME, DB_PORT, mongoDBURL } = process.env;
//Ссылка для  локального подключения
//const dbConnectionURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const dbConnectionURL =
  NODE_ENV === 'production'
    ? mongoDBURL
    : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
function dbConnect() {
  mongoose.connect(dbConnectionURL, options, err => {
    if (err) return console.log(err);
    return console.log(chalk.yellow('Successful connect to mongo'));
  });
}

export default dbConnect;
