import path from "path";
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import clearImage from "./utils/file.js";


//import routes
import userRoutes from "./routes/userRoutes.js";
import  conversationRoutes from "./routes/conversationRoutes.js";
import  coupounCodeRoutes from "./routes/coupounCodeRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import  messageRoutes from "./routes/messageRoutes.js";
import  orderRoutes from "./routes/orderRoutes.js";
import  paymentRoutes from "./routes/paymentRoutes.js";
import  productRoutes from "./routes/productRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import  withdrawRoutes from "./routes/withdrawRoutes.js";


const port = process.env.PORT || 5000;
const API ="/api/v2"

connectDB();

const app = express();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    cb(null, "img_" + uuidv4() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
);
app.use("/images", express.static(path.join(__dirname, "backend/images")));

app.use(cookieParser());

app.use(`${API}/user`, userRoutes);
app.use(`${API}/conversation`, conversationRoutes);
app.use(`${API}/message`, messageRoutes);
app.use(`${API}/order`, orderRoutes);
app.use(`${API}/shop`, shopRoutes);
app.use(`${API}/product`, productRoutes);
app.use(`${API}/event`, eventRoutes);
app.use(`${API}/coupon`, coupounCodeRoutes);
app.use(`${API}/payment`, paymentRoutes);
app.use(`${API}/withdraw`, withdrawRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")),
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.put("/uploadImage", (req, res, next) => {
  if (!req.file) {
    return res.status(200).json({ message: "No file provided!" });
  }
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }
  return res
    .status(201)
    .json({ message: "File stored.", filePath: req.file.path });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
