import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// 1. Serve images folder statically
app.use("/images", express.static("images"));

// 2. Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});
const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// 3. Change POST route to accept file upload
app.post("/books", upload.single("cover"), (req, res) => {
  const q = "INSERT INTO books(title, `desc`, price, cover) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.file ? req.file.filename : null, // Store uploaded filename
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book has been created successfully.");
  });
});

// 4. Keep delete and update routes as is
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", upload.single("cover"), (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET title= ?, `desc`= ?, price= ?, cover= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.file ? req.file.filename : req.body.cover, // Use new file if uploaded, else keep old
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});