const express = require('express');
const { ApolloServer } = require('@apollo/server');
const cors = require('cors');
const { expressMiddleware } = require('@as-integrations/express5');
const axios = require('axios');

async function startServer() {
    const app = express();
    const server = new ApolloServer({

        typeDefs: `


        type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
    }


            type Todo {
            id: ID!
            title: String!
            completed: Boolean
            userId: ID!
            user: User
            }

         type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id: ID!): User
    }

        `,

        resolvers:{

         Todo: {
  user: async (todo) => {
    try {
      console.log("Fetching user:", todo.userId);

      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${todo.userId}`
      );

      console.log("User found:", data.name);

      return data;
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  }
},


            Query: {
                getTodos: async () => (await  axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getAllUsers: async () => (await  axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getUser: async (parent,{id}) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
            },
        }
    });

    app.use(cors());
    app.use(express.json());


    await server.start();


    app.use('/graphql', expressMiddleware(server));

    app.listen(4000, () => {
        console.log('Server is running on PORT 4000');
    });
}

startServer(); 