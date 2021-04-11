import Cors from 'cors';
import initMiddleware from '../../../src/utils/initMiddleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
  }),
);

export default async function handler(req, res) {
  await cors(req, res);
  const { token } = req.query;
  console.log('TOKEN IS ', token);
  res.end(token);
}
