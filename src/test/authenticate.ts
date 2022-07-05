import { assert } from 'chai';
import mongoose from 'mongoose';
import { signup, getAllUsers } from '../services/user'

let db;
before((done) => {
  const URI='mongodb://root:root@localhost:27017/discord-clone?authSource=admin';
  mongoose.connect(URI);
  db = mongoose.connection;
  const newUser = await signup({email: 'quanba@gmail.com', name: 'quan', password: '123456'}) 
  done();
});

after(() => {
  db.close();
});

describe('authenticate', () => {
  it('api login should work', async () => {

    // getAllUsers().then((r)=>{
    //   console.log(r);
    // });
    const users = await getAllUsers();
    console.log(users)
    
    console.log('xxxx');
    // done()
  });

});