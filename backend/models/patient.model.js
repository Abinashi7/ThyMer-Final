// A patient of a user (therapist).
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
      id: Schema.ObjectId,
      userId: { type: mongoose.SchemaTypes.ObjectId },
      name: { type: String, required: true },
      dob: { type: Date, required: true },
      notes: { type: Array, default: [] },
      medication: { type: Array, default: [] },
      past_appointments: [{ date: String, id: String }],
      future_appointments: [{ date: String, id: String }],
      image: {type: String},
      avatar_url: {type: String}
  },
  {
    timestamps: true
  }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;

/**
 * {
    "id": String,
    "userId": String,
    "name": String,
    "dob": String,
    "notes": [String], 
    "medication": [String],
    "past_appointments": [{"date": String, "id": String}],
    "future_appointments": [{"date": String, "id": String}]
}   
 */
