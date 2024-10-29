const { Router } = require('express');
const patientController = require('../app/controllers/patientController');
const router = Router();

router.get('/patients', patientController.allPatients);
router.get('/patient/id/:id', patientController.show);
router.post('/patient/create', patientController.create);
router.put('/patient/update/:id', patientController.update);
router.delete('/patient/delete/:id', patientController.delete);

module.exports = router;
