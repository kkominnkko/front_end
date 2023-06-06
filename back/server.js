const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config({ debug: true, override: false });

const app = express();

// Added CORS policy
const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
};
app.use(cors(corsOptions));
app.use((_, res, next) => {
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

app.use(bodyParser.json());

app.get("/api/articles", (_, res) => {
	pool.query("SELECT * FROM articles", (error, result) => {
		if (error) {
			console.error("Error retrieving articles from the database:", error);
			res.status(500).json({ error: "Error retrieving articles from the database" });
		} else {
			res.json(result.rows);
		}
	});
});

app.post("/api/login", ({ body }, res) => {
	const { email, password } = body;
	pool.query("SELECT * FROM users WHERE email = $1", [email], (error, result) => {
		if (error) {
			console.error("Error retrieving user from the database:", error);
			res.status(500).json({ error: "Error retrieving user from the database" });
		} else {
			const user = result.rows[0];
			if (user != null && user.password === password) {
				res.json({ success: true, email: user.email });
			} else {
				res.status(401).json({ error: "Invalid email or password" });
			}
		}
	});
});

app.post("/api/register", ({ body }, res) => {
	const { email, password } = body;

	pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password], (error, _) => {
		if (error) {
			console.error("Error registering user:", error);
			res.status(500).json({ error: "Internal server error" });
		} else {
			res.status(200).json({ message: "Registration successful" });
		}
	});
});

app.post("/api/profile", ({ body }, res) => {
	const { email } = body.user;
	console.log(body);
	pool.query("SELECT * FROM users WHERE email = $1", [email], (error, result) => {
		if (error) {
			console.error("Error retrieving user from the database:", error);
			res.status(500).json({ error: "Internal server error" });
		} else {
			res.json(result.rows[0]);
		}
	});
});

app.get("/api/articles/:id", (req, res) => {
	const articleId = parseInt(req.params.id);

	pool.query("SELECT * FROM articles WHERE article_id = $1", [articleId], (error, result) => {
		if (error) {
			console.error("Error fetching article details:", error);
			res.status(500).json({ error: "Error fetching article details" });
		} else {
			const article = result.rows[0];
			if (article == null) {
				res.status(404).json({ error: `Article with ${articleId} not founded.` });
			} else {
				res.json(article);
			}
		}
	});
});

app.listen(5000, () => {
	console.log("Server started on port 5000");
});
