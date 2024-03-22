// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const startDB = require('./helpers/DB');
const { addUser, getAllUsers, getSingleUser, getDeleteUser } = require('./helpers/controllers');

require('dotenv').config()

fastify.register(startDB);
// Declare a route
fastify.get('/', function handler (request, reply) {
  reply.send({ hello: 'world' })
});


fastify.post("/users", addUser);
fastify.get("/users", getAllUsers);
fastify.get("/users/:id", getSingleUser);
fastify.delete("/users/:id", getDeleteUser);
// Run the server!
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
