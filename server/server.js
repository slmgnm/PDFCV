const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;

  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    temperature: 1,
    max_tokens: 120,
    prompt: prompt,
  });
  res.send(completion.data.choices[0].text);
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// const express = require("express");
// const app = express();
// const port = 5000;
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const rateLimit = require("express-rate-limit");

// // hardcoded email and password
// const credentials = [
//   {
//     email: "admin@example.com",
//     password: bcrypt.hashSync("password1", 10),
//   },
//   {
//     email: "user1@example.com",
//     password: bcrypt.hashSync("password2", 10),
//   },
//   {
//     email: "salim.ghanem@integrify.io",
//     password: bcrypt.hashSync("123", 10),
//   },
//   {
//     email: "sal@gmail.com",
//     password: bcrypt.hashSync("185223", 10),
//   },
// ];

// // Enable CORS for all requests
// app.use(cors());
// // use the body-parser package to parse the request body
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// const signInLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // limit each IP to 5 requests per windowMs
// });

// app.post("/signin", signInLimiter, (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // find the user with the email passed in the request body
//     const user = credentials.find((x) => x.email === email);

//     // check if the password matches the password for the user
//     if (user && bcrypt.compareSync(password, user.password)) {
//       // send back a response saying authenticated
//       res.json({
//         status: "authenticated",
//       });
//     } else {
//       // send back a response saying not authenticated
//       res.json({
//         status: "not authenticated",
//       });
//     }
//   } catch (error) {
//     // send back a response with the error details
//     res.json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

// // start the server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
