import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import testRoutes from './routes/testRoutes';

// +----------------------------------------+
// +     Prisma Client Initialization       +
// +----------------------------------------+
const prisma = new PrismaClient();

// pang initialize lang pero inde gd necessary. gn copy ko mn lng sa docs
// source: https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb/querying-the-database-typescript-mongodb
async function main() {
    // ... you will write your Prisma Client queries here
    await prisma.$connect()
    console.log('Connected to the database')
}

// to ensure that the Prisma Client disconnects properly after the main() function executes
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })


// +--------------------+
// +     Express        +
// +--------------------+
const app = express();
const port = 3001;


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/tests', testRoutes);
app.use('/users', userRoutes);

// basta pabalo nga gagana ah
app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});