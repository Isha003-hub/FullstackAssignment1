const express = require("express");
const router = express.Router();

const { listofExperience, showAddForm, AddNewExperience, DeleteExperienceById, getallExperienceAPI } = require("./controller");

router.get("/list", listofExperience);
router.get("/add", showAddForm);
router.post("/add/submit",AddNewExperience);
router.get("/delete/submit", DeleteExperienceById);
router.get("/api/list", getallExperienceAPI);

module.exports = router;



