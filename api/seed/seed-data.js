/**
 * Seed example data into MongoDB.
 *
 * Usage:
 *   cd api
 *   node seed/seed-data.js
 *
 * Optional:
 *   node seed/seed-data.js --reset   # deletes all topics before seeding
 */

require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../db/mongoose");
const Topic = require("../schemas/Topic");

const seedTopics = [
  {
    language: "English",
    title: "Travel",
    summary:
      "A practical topic for building confidence when talking about trips, planning, and experiences abroad.",
    questions: [
      "Where is the best place you have ever travelled to, and why?",
      "Do you prefer planning every detail or travelling more spontaneously?",
      "What is a travel mistake you have made, and what did you learn from it?",
      "What would be your dream destination if money and time were not a problem?",
      "How does travelling change the way you see your own country?",
    ],
    vocabulary: [
      "itinerary",
      "layover",
      "accommodation",
      "budget",
      "sightseeing",
      "local cuisine",
      "jet lag",
    ],
    images: [],
    exampleSentences: [
      "I usually plan an itinerary, but I leave some time for spontaneous sightseeing.",
      "We had a long layover, so we explored the city before our next flight.",
      "Local cuisine is one of the main reasons I love travelling.",
    ],
    collocations: [
      "book a flight",
      "pack light",
      "go sightseeing",
      "travel on a budget",
      "try local cuisine",
    ],
  },
];

async function seed({ reset = false } = {}) {
  await connectDB();

  if (reset) {
    const res = await Topic.deleteMany({});
    console.log(`[seed] Deleted ${res.deletedCount ?? 0} topics`);
  }

  const upserted = [];

  for (const payload of seedTopics) {
    const doc = await Topic.findOneAndUpdate(
      { language: payload.language, title: payload.title },
      payload,
      { upsert: true, new: true, runValidators: true }
    );
    upserted.push(doc);
  }

  console.log(`[seed] Upserted ${upserted.length} topic(s)`);
  return upserted;
}

if (require.main === module) {
  const reset = process.argv.includes("--reset");

  seed({ reset })
    .then(() => mongoose.connection.close())
    .catch((err) => {
      console.error("[seed] Failed:", err);
      mongoose.connection
        .close()
        .catch(() => void 0)
        .finally(() => process.exitCode = 1);
    });
}

module.exports = { seedTopics, seed };
