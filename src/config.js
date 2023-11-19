import dotenv from 'dotenv';

dotenv.config();

if (!process.env.CONNECTION_STR) {
    console.log('CONNECTION_STR is not defined');
    process.exit(1);
}

export default {
    CONNECTION_STR: process.env.CONNECTION_STR,
};
