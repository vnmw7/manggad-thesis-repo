import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import dotenv from "dotenv";
import { uploadRouter } from "./uploadthing";
import { createRouteHandler } from "uploadthing/express";
import multer from "multer";


// const variables
const app = express();
const upload = multer({ dest: "uploads/" }); // destination sang uploaded file

// with mutlter middleware --> upload.single()
// 💬[vincent]: api endpoint para mag test sang upload
app.post("/test/upload", upload.any(), (req, res) => { 
  console.log(req.files); // Log the file information
  console.log(req.body)
  if (!req.files) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ file: req.files });
})


// Load environment variables from .env file
dotenv.config();
// .env variables
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;

// +----------------------------------------+
// +     Prisma Client Initialization       +
// +----------------------------------------
const prisma = new PrismaClient();

// pang initialize lang pero inde gd necessary. gn copy ko mn lng sa docs
// source: https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb/querying-the-database-typescript-mongodb
async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.$connect();
  console.log("Connected to the database");
}

// to ensure that the Prisma Client disconnects properly after the main() function executes
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


// +--------------------+
// +     Express        +
// +--------------------

// Middleware
app.use(express.json());
app.use(cors());

// UploadThing
// 💬[vincent]: mas una dapat ang amo ni nga middleware kaysa regular nga routes
app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {},
  }),
);

// Routes
app.use("/user", userRoutes);
app.use("/books", bookRoutes);

// basta pabalo nga gagana ah
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Connected to ${databaseUrl}`);
  console.log(
    `💬[vincent]: check ang database url sa .env or register ang ip mo sa mongodb atlas if inde maka crud sa database`,
  );
});
