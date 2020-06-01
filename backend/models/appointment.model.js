const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// A past or future appointment of a patient.
const appointmentSchema = new Schema(
  {
    id: Schema.ObjectId,
    userId: { type: String },
    patientId: { type: String },
    notes: { type: Array, default: [] },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;

/**
 * {   
    "id": String,
    "userId": String,
    "patientId": String,
    "date": String,
    "notes": [String] 
}
 */
