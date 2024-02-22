import { MongoClient } from 'mongodb';
import { IUser } from '@/types/user';
import { AdapterUser } from 'next-auth/adapters';
import { User } from 'next-auth';

export async function connectToDB() {
  const uri = process.env.MONGODB_URI!;
  const client = await MongoClient.connect(uri);
  return client;
}

export async function getUser(userId: string) {
  const client = await connectToDB();
  const usersCollection = client.db().collection('users');
  const existingUser = await usersCollection.findOne<IUser>({ id: userId });
  client.close();
  return existingUser;
}

export async function insertUser(user: AdapterUser | User) {
  const client = await connectToDB();
  const usersCollection = client.db().collection('users');
  await usersCollection.insertOne(user);
  client.close();
}
