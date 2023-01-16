module.exports = {
  swagger : {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Fastify API',
        description: 'Building a blazing fast REST API with Node.js, MongoDB, Fastify and Swagger',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  },
  jwt : {
    secret : '1234567890'
  },
  cookie : {
    secret : '1234567890'
  },
  db: {
    host:'127.0.0.1',
    username:'root',
    password:'',
    database:'',
    port:'3306',
  }
  
};
