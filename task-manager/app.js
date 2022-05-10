// const { MongoClient, ObjectId, MongoServerError } = require('mongodb');

// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'task-manager';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('users');

//   // const insertResult = await collection.insertOne({
//   //   name: 'Menganito',
//   //   age: 25
//   // });
//   // console.log('insert result', insertResult);

//   const findResult = await collection.find({}).toArray();
//   console.log('Found documents =>', findResult);

//   const filteredDocs = await collection.find({ age: 27 }).toArray();
//   console.log('Found documents filtered by { age: 27 } =>', filteredDocs);

//   //Exercise: Insert more users and tasks
//   // 1. Use insertMany to insert multiple documents for users and tasks
//   // 2. Tasks {description (string), completed (boolean)}
//   // 3. See results in MongoDB Compass

//   const tasksCollection = db.collection('taks');

//   // const updateResult = await tasksCollection.updateOne(
//   //   {'_id': new ObjectId("625ea248516b24f6d28e9c28")},
//   //   { $set: {description: 'Clean the house'}}
//   // );
//   // console.log(updateResult);

//   // const deleteResult = await tasksCollection.deleteOne(
//   //   {'_id': new ObjectId("625ea248516b24f6d28e9c28")}
//   // );
//   // console.log(deleteResult);

//   const findTasks = await tasksCollection.find({}).toArray();
//   console.log('Found documents =>', findTasks);

//   try {
//     await collection.insertOne({ _id: 1 });
//     await collection.insertOne({ _id: 1 }); // duplicate key error
//   } catch (error) {
//     if (error instanceof MongoServerError) {
//       console.log(`Error worth logging: ${error}`); // special case for some reason
//     }
//     throw error; // still want to crash
//   }

//   //Exercise: Use updateMany and deleteMany
//   // 1. Use updateMany to update multiple documents for users and tasks
//   // 2. Use deleteMany to delete multiple documents for users and tasks
//   // 3. See results in MongoDB Compass

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());