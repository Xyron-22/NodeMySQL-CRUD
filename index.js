import express from "express";
import mysql from "mysql2";
import cors from "cors";
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.USER_PASS,
    database: "test",
});



app.get("/", (req, res) => {
    res.json("hello this is the backend")
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    connection.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});

app.post("/books", (req, res) => {
    console.log(req.body)
    const q = "INSERT INTO books (`title`, `description`, `cover`, `price`) VALUES (?)"
    const {title, description, cover, price} = req.body;
    const values = [title, description, cover, price]
    connection.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"
    connection.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});

app.put("/books/:id", (req, res) => {
    const {title, description, price, cover} = req.body;
    const bookId = req.params.id
    const q = "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [title, description, price, cover]
    connection.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});



app.listen(process.env.PORT, () => console.log("connected to backend"));