const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

const database = {
	users: [
		{
			id: "123",
			name: "John",
			email: "john@example.com",
			password: "password",
			entries: 0,
			joined: new Date(),
		},
		{
			id: "124",
			name: "Sally",
			email: "sally@example.com",
			password: "password1",
			entries: 0,
			joined: new Date(),
		},
	],
};

app.get("/", (req, res) => {
	res.json(database.users);
});
app.post("/signin", (req, res) => {
	if (
		req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password
	) {
		res.json(database.users[0]);
	} else {
		res.status(400).json("Error Logging In");
	}
});

app.post("/register", (req, res) => {
	const { email, name, password } = req.body;
	database.users.push({
		id: "125",
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date(),
	});
	res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	});
	if (!found) {
		res.status(400).json("Not Found");
	}
});

app.put("/image", (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	});
	if (!found) {
		res.status(400).json("Not Found");
	}
});

app.listen(3001, () => {
	console.log(`App is running on ${PORT}.`);
});
