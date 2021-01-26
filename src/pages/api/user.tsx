import 'dotenv/config';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.log('ok');
  })
  .catch((err) => console.log(err));

export interface ResponseType {
  message?: string;
  errors?: ErrorConstructor[];
}

export default (
  request: NextApiRequest,
  response: NextApiResponse<ResponseType>,
) => {
  try {
    return response.status(200).json({
      message: 'OK',
    });
  } catch (err) {
    return response.status(500).json({
      errors: [err],
    });
  }
};
