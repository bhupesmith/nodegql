import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import express from 'express';
import testStore from './src/testStore.js'

const app = express();
const PORT = 9000;

testStore.setVal(1)
// setVal(1)

app.get('/', (req, res) => {

    // setVal(1)
    testStore.setVal(1)
    res.send(`<h1>Welcome to the GQL Server</h1>
        
        Value of setT: ${testStore.setVal()}
        `)
})
app.use(cors(), express.json())
const typeDefs = `#graphql
    type Query {
        greeting: String
    }
`;

const resolvers = {
    Query: {
        greeting: () => 'Hello this is my first graphql',
    },
}
const apolloServer = new ApolloServer({typeDefs , resolvers})
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer));
app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL server running on http://localhost:${PORT}/graphql`);
});
