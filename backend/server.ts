import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

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


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});

app.post("/admin/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await prisma.admin.create({
            data: {
                username,
                password,
            },
        });
        res.json(admin);
    } catch (error) {
        if (error instanceof Error) {
            res.json({ error: error.message });
        } else {
            res.json({ error: 'An unknown error occurred' });
        }
    }
})

app.get("/admin/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await prisma.admin.findUnique({
            where: {
                username,
            },
        });
        if (!admin) {
            res.json({ error: 'Invalid username' });
            return;
        }
        if (admin.password !== password) {
            res.json({ error: 'Invalid password' });
            return;
        }
        res.json({ message: 'Login successful' });
    } catch (error) {
        if (error instanceof Error) {
            res.json({ error: error.message });
        } else {
            res.json({ error: 'An unknown error occurred' });
        }
    }
})