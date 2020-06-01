const router = require("express").Router();
let Appointment = require("../../models/appointment.model");
const auth = require("../../middleware/auth");

// endpoint that handles http GET request
// ROOT URL or the view of a therapist
// router.route("/").get((req, res) => {
//   Appointment.find()
//     .then(patients => res.json(patients))
//     .catch(err => res.status(400).json("Error: " + err));
// });

router.route("/add").post(auth, (req, res) => {
  const userId = req.user.id;
  const patientId = req.body.patientId;
  const date = Date.parse(req.body.date);
  const notes = Array(req.body.notes);

  const newAppointment = new Appointment({
    userId,
    patientId,
    date,
    notes
  });
  newAppointment
    .save()
    .then(() => {res.json({id: newAppointment._id})})
    .catch(err => res.status(400).json("Error: " + err));
});

// update appointment
router.route('/update-appointment/:id').put(auth, (req, res, next) => {
  Appointment.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      res.status(400).json({Message: error.message})
    } else {
      res.json(data);
    }
  })
});

// delete appointment
router.route('/delete-appointment/:id').delete(auth, (req, res, next) => {
  Appointment.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      res.status(400).json({Message: error.message})
    } else {
      res.json(data);
    }
  })
});

// Endpoint for finding an appointment by id
router.route("/:appId").get((req, res) => {
  const appId = req.params['appId'];
  Appointment.findById(appId)
      .then(appointment => res.json(appointment))
      .catch(err => res.status(400).json("Error: " + err));
});

// Endpoint for finding all the appointments for a patient
router.route("/patient/:patientID").get((req, res) => {
  const patientID = req.params['patientID'];
  Appointment.find({
    patientID: patientID
  })
      .then(appsForPatient => res.json(appsForPatient))
      .catch(err => res.status(400).json("Error: " + err));
});

// Endpoint for returning the appointments of active user
router.route("/").get(auth, (req, res) => {
  Appointment.find({
    userId: req.user.id
  })
      .then(appointmentsForUser => res.json(appointmentsForUser))
      .catch(err => res.status(400).json("Error: " + err));
});




module.exports = router;
