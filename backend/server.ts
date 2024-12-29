import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import dotenv from "dotenv";
import cloudinary from "./utils/cloudinary";
import upload from "./middleware/multer";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";


// const variables
const app = express();

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

// Routes
app.use("/user", userRoutes);
app.use("/books", bookRoutes);

app.post("/upload", upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded"
    });
  }

  cloudinary.uploader.upload(req.file.path, { folder: "manggad/pdf", resource_type: "raw" }, (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error"
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result
    });
  });
})

// basta pabalo nga gagana ah
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Connected to ${databaseUrl}`);
  console.log(
    `💬[vincent]: check ang database url sa .env or register ang ip mo sa mongodb atlas if inde maka crud sa database`,
  );
});
