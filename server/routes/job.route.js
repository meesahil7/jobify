const express = require("express");
const {
  getJobs,
  getJob,
  addJob,
  updateJob,
  deleteJob,
} = require("../controllers/job.controller");

const jobRouter = express.Router();

jobRouter.get("/getJobs", getJobs);

jobRouter.get("/getJob/:id", getJob);

jobRouter.post("/add", addJob);

jobRouter.patch("/update/:id", updateJob);

jobRouter.delete("/delete/:id", deleteJob);

module.exports = { jobRouter };
