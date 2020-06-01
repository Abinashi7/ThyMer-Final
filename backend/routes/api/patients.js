const router = require("express").Router();
let Patient = require("../../models/patient.model");
const auth = require("../../middleware/auth");
const multer = require('multer');

const storage = multer.diskStorage({
  // destination: function(req, file, cb) {
  //     cb(null, './uploads/');
  // },
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


// endpoint that handles http GET request
// ROOT URL or the view of a therapist
// router.route("/").get(auth, (req, res) => {
//   Patient.find()
//     .then(patients => res.json(patients))
//     .catch(err => res.status(400).json("Error: " + err));
// });

router.route("/add").post(auth, upload.single('image'), (req, res) => {
  const id = req.body.id;
  const userId = req.user.id;
  const name = req.body.name;
  const dob = Date.parse(req.body.dob);
  const notes = Array(req.body.notes);
  const medication = Array(req.body.medication);
  const past_appointments = Array(req.body.past_appointments);
  const future_appointments = Array(req.body.future_appointments);
  const avatar_url = req.body.avatar_url;
  let image = "";
  if (req.file) {
    image = req.file.path
  }

  const newPatient = new Patient({
    id,
    userId,
    name,
    dob,
    notes,
    medication,
    past_appointments,
    future_appointments,
    avatar_url,
    image
  });
  newPatient
    .save()
    .then(() => res.json("Patient added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// update patient
router.route('/update-patient/:id').put(auth, (req, res, next) => {
  Patient.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      res.status(400).json({Message: error.message})
    } else {
      res.json(data)
      // console.log('Patient information updated!')
    }
  })
});

// delete patient
router.route('/delete-patient/:id').delete(auth, (req, res, next) => {
    Patient.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        res.status(400).json({Message: error.message})
      } else {
        res.status(200).json({
          message: data
        })
      }
    })
  });

// Endpoint for finding a patient by id
router.route("/:patientId").get((req, res) => {
  const patientId = req.params['patientId'];
  Patient.findById(patientId)
      .then(patient => res.json(patient))
      .catch(err => res.status(400).json("Error: " + err));
});

// Endpoint for returning the patients of active user
router.route("/").get(auth, (req, res) => {
  Patient.find({
    userId: req.user.id
  })
      .then(patientsForUser => res.json(patientsForUser))
      .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;
