const it = require("ava").default;
const chai = require("chai");
var expect = chai.expect;
const startDB = require('../helpers/DB');
const { MongoMemoryServer } = require('mongodb-memory-server');

require('dotenv').config()
const { addUser, getAllUsers, getSingleUser, getDeleteUser } = require('../helpers/controllers');
const User = require('../models/user');
const sinon = require("sinon");
const utils = require('../helpers/utils')
// it.before(async (t)=>{
//     t.context.mongod = await MongoMemoryServer.create();
    //  process.env.MONGOURI = t.context.mongod.getUri('cloudUnitTesting');
//     await startDB();
// }

// );

// it.after(async (t)=>{
//  await t.context.mongod.stop({doCleanUp: true});
// })
// it("create use succesfully", async (t) => {
//   // setup
//   const request = {
//     body: {
//       firstName: "Menna",
//       lastName: "Hamdy",
//       age: 11,
//       job: "fs",
//     },
//   };
//   const expectedResult = {
//     fullName: "Menna Hamdy",
//     age: 11,
//     job: "fs",
//   };
// //   sinon.stub(utils, 'getFullName').returns('Menna Hamdy');
//   sinon.stub(utils, 'getFullName').callsFake((fname, lname)=>{
//     expect(fname).to.be.equal(request.body.firstName);
//     expect(lname).to.be.equal(request.body.lastName);
//     return 'Menna Hamdy'
//   })
//   const actualResult = await addUser(request);
//   const result = {
//     ...expectedResult,
//     __v: actualResult.__v,
//     _id: actualResult._id
//   }
//   expect(actualResult).to.be.a('object');
//   expect(actualResult._doc).to.deep.equal(result);
//   t.teardown(async ()=>{
//     await User.deleteMany({
//         fullName: request.body.fullName,
//     })
//   })
//   t.pass();
// });


// ========================getUsers==========================================================

// it.before(async (t) => {
//   t.context.mongod = await MongoMemoryServer.create();
//   process.env.MONGOURI = t.context.mongod.getUri('cloudUnitTesting');
//   await startDB();
// });

// it.after(async (t) => {
//   await t.context.mongod.stop({ doCleanUp: true });
// });

// it("get all users successfully - multiple users", async (t) => {
//   const user1 = new User({ fullName: 'ahmed', age: 21, job: 'Engineer' });
//   await user1.save();

//   const user2 = new User({ fullName: 'salem', age: 931, job: 'Manager' });
//   await user2.save();

//   const request = {};
//   const actualResult = await getAllUsers(request);

//   expect(actualResult).to.be.an('array');
//   expect(actualResult).to.have.lengthOf(2);
//   expect(actualResult[0].fullName).to.equal('User 1');
//   expect(actualResult[1].job).to.equal('Manager');

//   t.teardown(async () => {
//     await User.deleteMany({});
//   });

//   t.pass();
// });


// ==========================getSingleUser=============================================================

// it.before(async (t) => {
//   t.context.mongod = await MongoMemoryServer.create();
//   process.env.MONGOURI = t.context.mongod.getUri('cloudUnitTesting');
//   await startDB();
// });

// it.after(async (t) => {
//   await t.context.mongod.stop({ doCleanUp: true });
// });

// it("get single user successfully", async (t) => {
//   const user = new User({ fullName: 'ahmed mohsen', age: 123, job: 'Developer' });
//   await user.save();

//   const request = {
//       params: { id: user._id.toString() } 
//   };
//   const actualResult = await getSingleUser(request);
//   expect(actualResult).to.be.an('object');
//   expect(actualResult._id.toString()).to.equal(user._id.toString());

//   t.teardown(async () => {
//       await User.deleteMany({});
//   });

//   t.pass();
// });

// // =====================================deleteUser=================================================

it.before(async (t) => {
  t.context.mongod = await MongoMemoryServer.create();
  process.env.MONGOURI = t.context.mongod.getUri('cloudUnitTesting');
  await startDB();
});

it.after(async (t) => {
  await t.context.mongod.stop({ doCleanUp: true });
});

it("delete single user successfully", async (t) => {
  const user = new User({ fullName: 'hamed kareem', age: 32, job: 'Tester' });
  await user.save();

  const request = {
      params: { id: user._id.toString() } 
  };

  const actualResult = await getDeleteUser(request);
  expect(actualResult).to.be.an('object');
  expect(actualResult.success).to.equal(true);
  expect(actualResult.deleted).to.equal(1);
  const deletedUser = await User.findById(user._id);
  expect(deletedUser).to.equal(null);

  t.teardown(async () => {
      await User.deleteMany({});
  });

  t.pass();
});


// bonus : validation, updateUser
