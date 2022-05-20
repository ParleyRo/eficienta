const fastify = require('fastify')({ logger: true });

const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017/');
const dbName = 'efficiency';

fastify.register(require('fastify-cors'), { 
	origin: '*'
})

// Declare a route
fastify.get('/user/:secret', async (req, reply) => {

	const dbCollection = await DB.connect('users');

	const findResult = await dbCollection.find({secret: req.params.secret}).toArray();
	
	console.log('Found documents =>', findResult);
	
	return reply.send(findResult[0]);

});

fastify.post('/save', async (req, reply) => {

	const params = req.body;
	
	const dbCollection = await DB.connect('users');
	console.log(params);
	const insertResult = await dbCollection.updateOne({secret: params.secret},{$set: params},{upsert: true});

	console.log('Inserted documents =>', insertResult);
	
	return {success: 1}
});



class Database{

	constructor(dbName){

		this.dbName;
		this.isConnected = false;
	
	}

	async connect(collection){

		if(this.isConnected){
			return this.collection;
		}

		await client.connect();

		console.log('Connected successfully to server');
	
		this.db = client.db(dbName);
		
		this.collection = this.db.collection(collection);

		this.isConnected = true;

		return this.collection;
	}
}
const DB = new Database(dbName);

// Run the server!
fastify.listen(5001, '0.0.0.0', (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})