const fastify = require('fastify')({ logger: true });

const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017/');
const dbName = 'efficiency';

fastify.register(require('fastify-cors'), { 
	origin: ['http://localhost:5000', 'http://parley.go.ro:5000']
	//origi: '*'
})

// Declare a route
fastify.get('/user/:secret', async (req, reply) => {

	console.log(req.headers.origin)
	const dbCollection = await DB.connect('users');

	const findResult = await dbCollection.find({secret: req.params.secret}).toArray();
	
	console.log('Found documents =>', findResult);
	
	if(!findResult.length){
		return {error: 1}
	}

	return reply.send(findResult[0]);

});

fastify.post('/save', async (req, reply) => {

	const params = req.body;
	
	//in the first place we're expecting params :secret , :everhour.apikey;
	
	// if(params.everhour == null){
	// 	return {success: true}
	// }

	const dbCollection = await DB.connect('users');
	
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