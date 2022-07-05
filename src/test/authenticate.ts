import { assert } from 'chai';
import mongoose from 'mongoose';
import { signup, getAllUsers } from '../services/user'

before(async () => {
  const URI='mongodb://quan:buianhquan@localhost:27017/discord-clone?authSource=admin';
  mongoose.connect(URI);
  const db = mongoose.connection;
  const newUser = await signup({email: 'quanba@gmail.com', name: 'quan', password: '123456'}) 
});

after(() => {
  
});

describe('authenticate', async () => {
  it('api login should work', async () => {
    const users = await getAllUsers();
    console.log(users)
    console.log('xxxx');
  });
});