// CRUD create read update delete
const { MongoClient, ObjectId, MongoServerError } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'task-manager';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('users');

  //create
  // const insertResult = await collection.insertOne({
  //   name: 'Mengano',
  //   age: 23
  // });
  // console.log('insert result', insertResult);

  //read
  const findResult = await collection.find({}).toArray();
  console.log('Found user documents =>', findResult);

  //update
  const updateResult = await collection.updateOne(
    {'_id': new ObjectId('625e012aaf20f05a4736e1c4')},
    { $inc: { age: 1} }
  );
  console.log('update result', updateResult);

  //filter
  const filteredDocs = await collection.find({ name: 'Tomas' }).toArray();
  console.log('Found user documents filtered by { name: Tomas } =>', filteredDocs);

  // await db.collection('tasks').insertMany([
  //   {
  //     description: 'Clean the house',
  //     completed: false
  //   },
  //   {
  //     description: 'Prepare lunch',
  //     completed: true
  //   },
  //   {
  //     description: 'Water the plants',
  //     completed: true
  //   },
  // ]);

  const tasksCollection = db.collection('tasks');

  const result = await tasksCollection.find({}).toArray();
  console.log('Found task documents =>', result);

  //update
  const updateResult = await tasksCollection.updateOne(
    {'_id': new ObjectId('625e072078f5090b86fde730')},
    { $set: { description: "Pot the plants"} }
  );
  console.log('update result', updateResult);

  const oneResult = await tasksCollection.findOne({'_id': new ObjectId('625e072078f5090b86fde730')});
  console.log('Found task document by id =>', oneResult);

  const deleteResult = await tasksCollection.deleteOne({'_id': new ObjectId('625e072078f5090b86fde72f')});
  console.log('Deleted task document by id =>', deleteResult);

  // try {
  //   await collection.insertOne({ _id: 1 });
  //   await collection.insertOne({ _id: 1 }); // duplicate key error
  // } catch (error) {
  //   if (error instanceof MongoServerError) {
  //     console.log(`Error worth logging: ${error}`); // special case for some reason
  //   }
  //   throw error; // still want to crash
  // }


  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
