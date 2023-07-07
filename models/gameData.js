const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameStatus: {
    type: String,
    enum: ["start", "stop", "reload", "result"],
    default: "stop",
  },
  gameResult: { type: String, default: 0 },
  natepute: {
    zero: { type: Number, default: 0 },
    one: { type: Number, default: 0 },
    two: { type: Number, default: 0 },
    three: { type: Number, default: 0 },
    four: { type: Number, default: 0 },
    five: { type: Number, default: 0 },
    six: { type: Number, default: 0 },
    seven: { type: Number, default: 0 },
    eight: { type: Number, default: 0 },
    nine: { type: Number, default: 0 },
  },
  akluj: {
    zero: { type: Number, default: 0 },
    one: { type: Number, default: 0 },
    two: { type: Number, default: 0 },
    three: { type: Number, default: 0 },
    four: { type: Number, default: 0 },
    five: { type: Number, default: 0 },
    six: { type: Number, default: 0 },
    seven: { type: Number, default: 0 },
    eight: { type: Number, default: 0 },
    nine: { type: Number, default: 0 },
  },
});

const GameData = mongoose.model("GameData", gameSchema);

module.exports = GameData;
