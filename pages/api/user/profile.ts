import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectToDB, getUser } from '@/utils/db';

export interface ChangeProfile {
  message?: string;
  email?: string;
}

interface ChangeProfileRequest extends NextApiRequest {
  body: ChangeProfile;
}

export default async function handler(
  req: ChangeProfileRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        res.status(401).json({ message: 'session not found' });
        return;
      }

      const user = await getUser(session.user?.id ?? '');

      if (!user) {
        res.status(404).json({ message: 'user not found' });
        return;
      }

      res
        .status(200)
        .json({ message: 'user profile is successfully updated', user: user });
      return;
    }

    case 'PATCH': {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        res.status(401).json({ message: 'session not found' });
        return;
      }

      const id = session.user?.id;

      const client = await connectToDB();
      const usersCollection = client.db().collection('users');
      const user = await usersCollection.findOne({ id: id });

      if (!user) {
        res.status(404).json({ message: 'user not found' });
        client.close();
        return;
      }

      const result = await usersCollection.updateOne(
        { id: id },
        { $set: { message: req.body.message, email: req.body.email } }
      );

      client.close();
      res.status(200).json({
        message: 'user profile is successfully updated',
        user: user,
        result: result,
      });
      return;
    }
    default:
      return;
  }
}
