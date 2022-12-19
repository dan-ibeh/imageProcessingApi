import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.get('/api', (req, res) => {
    res.send('image processor!')
})

app.use('/image', routes)

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});