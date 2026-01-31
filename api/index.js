require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require("./db/mongoose");
const routes = require("./router");
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));


const cors = require("cors");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: "https://convomundo.com",
  methods: ["GET"],
  credentials: false
}));

// Health check route (before API routes)
app.get("/health", (_, res) => {
  res.json({ status: "OK", message: "API is running" });
});

app.use("/api", routes);

connectDB();

// app.post("/topics", async (req, res) => {
//   try {
//     const { language, title, questions, vocabulary, summary, images, exampleSentences, collocations } = req.body;

//     if (!title) {
//       return res.status(400).json({ error: "title is required" });
//     }

//     const payload = {
//       language,
//       title,
//       questions: questions ?? [],
//       vocabulary: vocabulary ?? [],
//       summary: summary ?? '',
//       images: images ?? [],
//       exampleSentences: exampleSentences ?? [],
//       collocations: collocations ?? [],
//     };

//     const topic = await Topic.findOneAndUpdate(
//       { language: payload.language, title: payload.title },
//       payload,
//       { new: true, upsert: true, runValidators: true }
//     );

//     return res.status(201).json(topic);
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ error: err.message });
//   }
// });



// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found', 
    method: req.method, 
    path: req.path,
    availableRoutes: ['/health', '/api/topics', '/api/topics/:id']
  });
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
