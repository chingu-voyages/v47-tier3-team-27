import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT_CONNECT = process.env.PORT || 8084;

app.listen(PORT_CONNECT, () => {
    console.log(`server up running on - ${PORT_CONNECT}`)
})