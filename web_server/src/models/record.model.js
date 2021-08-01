const mongoose = require('mongoose')

const Schema = mongoose.Schema;

/**
 * Comments schema that has reference to Post and user schemas
 */
const recordSchema = Schema(
  {
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    device: {
      type: String,
      required: true,
    },
    timeMeasure: {
      type: Date,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Record', recordSchema);
