import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import express from 'express';
const app = express();
const PORT = 9000;

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the GQL Server</h1>')
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
