const express = require("express");
const router = express.Router();

const { listAllProject, showAddForm, AddNewProject, DeleteProjectById, GetProjectAPI } = require("./controller");

router.get("/list", listAllProject);
router.get("/add", showAddForm);
router.post("/add/submit", AddNewProject);
router.get("/delete/submit", DeleteProjectById);
router.get("/api/list", GetProjectAPI);

module.exports = router;