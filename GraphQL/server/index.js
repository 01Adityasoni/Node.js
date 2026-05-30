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
            email: String!
            username: String!
            phone: String!
            website: String!
        }



        type Todo {
            id: ID!
            text: String!
            completed: Boolean!
            userId: ID!
        }
        type Query {
        getTodos: [Todo]
        getUsers: [User]
        getUser(id: ID!): User
        }
        `,
        resolvers: {
            Query: {
                getTodos: async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

                    return response.data.map((todo) => ({
                        id: todo.id,
                        text: todo.title,
                        completed: todo.completed,
                        userId: todo.userId,
                    }));
                },
                getUsers: async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                    return response.data.map((user) => ({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        phone: user.phone,
                        website: user.website,
                    }));
                },
                getUser: async (_, { id }) => {
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                    const user = response.data;
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        phone: user.phone,
                        website: user.website,
                    };

                }


            }
        }
    });

    app.use(express.json());
    app.use(cors());


    await server.start();


    app.use('/graphql', expressMiddleware(server));

    app.listen(4000, () => {
        console.log(`Server is running on http://localhost:${4000}/graphql`);
    }
    );



}

startServer().catch((error) => {
    console.error(error);
    process.exit(1);
});