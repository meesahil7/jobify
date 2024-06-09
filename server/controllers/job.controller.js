const { Job } = require("../models/job.model");

const addJob = async (req, res) => {
  try {
    const { title, description, salary, companyId } = req.body;
    const job = await Job.create({
      title,
      description,
      salary,
      companyId,
      adminId: req.body.userId,
    });
    res.status(200).json({ message: "Job created", job });
  } catch (err) {
    console.log({
      message: "error-in-addJob-controller",
      error: err.message,
    }),
      res.status(500).json({ error: "internal-server-error" });
  }
};

const getJobs = async (req, res) => {
  try {
    const { userId } = req.body;
    const jobs = await Job.find({ adminId: userId });
    if (!jobs.length)
      return res.status(401).json({ message: "unauthorized-action" });
    res.status(200).json({ message: "jobs-fetched", jobs });
  } catch (err) {
    console.log({
      message: "error-in-getJobs-controller",
      error: err.message,
    }),
      res.status(500).json({ error: "internal-server-error" });
  }
};

const getJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const job = await Job.findOne({
      $and: [{ _id: id }, { adminId: userId }],
    });
    res.status(200).json({ message: "job-fetched", job });
  } catch (err) {
    console.log({
      message: "error-in-getJob-controller",
      error: err.message,
    }),
      res.status(500).json({ error: "internal-server-error" });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, decription, salary, companyId } = req.body;
    const updatedJob = await Job.findOneAndUpdate(
      {
        $and: [{ _id: id }, { adminId: req.body.userId }],
      },
      { title, decription, salary, companyId },
      { new: true }
    );
    if (!updatedJob)
      return res.status(401).json({ message: "unauthorized-action" });
    res.status(200).json({ message: "Job Updated", job: updatedJob });
  } catch (err) {
    console.log({
      message: "error-in-updateJob-controller",
      error: err.message,
    }),
      res.status(500).json({ error: "internal-server-error" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.findOneAndDelete({
      $and: [{ _id: id }, { adminId: req.body.userId }],
    });

    res.status(200).json({ message: "Job Deleted" });
  } catch (err) {
    console.log({
      message: "error-in-deleteJob-controller",
      error: err.message,
    }),
      res.status(500).json({ error: "internal-server-error" });
  }
};

module.exports = { addJob, getJob, getJobs, updateJob, deleteJob };
