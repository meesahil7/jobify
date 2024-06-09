const { Company } = require("../models/company.model");
const mongoose = require("mongoose");

const addCompany = async (req, res) => {
  try {
    const { userId, name, description, location } = req.body;
    const isValidId = mongoose.isValidObjectId(userId);
    if (!isValidId) return res.status(400).json({ error: "can't-add-company" });
    const company = await Company.create({
      name,
      description,
      location,
      adminId: userId,
    });
    res.status(200).json({ message: "Company created", company });
  } catch (err) {
    console.log({
      message: "error-in-addCompany-controller",
      error: err.message,
    }),
      res.status(500).json({ error: "internal-server-error" });
  }
};

const getCompanies = async (req, res) => {
  try {
    const { userId } = req.body;
    const isValidId = mongoose.isValidObjectId(userId);
    if (!isValidId) return res.status(400).json({ error: "no-company-found" });
    const companies = await Company.find({ adminId: userId });
    if (!companies.length)
      return res.status(401).json({ message: "unauthorized-action" });
    res.status(200).json({ message: "companies-fetched", companies });
  } catch (err) {
    console.log({
      message: "error-in-getCompanies-controller",
      error: err.message,
    }),
      res.status(500).json({ error: "internal-server-error" });
  }
};

const getCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const company = await Company.findOne({
      $and: [{ _id: id }, { adminId: userId }],
    });
    if (!company)
      return res.status(401).json({ message: "unauthorized-action" });
    res.status(200).json({ message: "company-fetched", company });
  } catch (err) {
    console.log({
      message: "error-in-getCompany-controller",
      error: err.message,
    }),
      res.status(500).json({ error: "internal-server-error" });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location } = req.body;
    const updatedCompany = await Company.findOneAndUpdate(
      {
        $and: [{ _id: id }, { adminId: req.body.userId }],
      },
      { name, description, location },
      { new: true }
    );
    if (!updatedCompany)
      return res.status(401).json({ message: "unauthorized-action" });
    res
      .status(200)
      .json({ message: "Company Updated", company: updatedCompany });
  } catch (err) {
    console.log({
      message: "error-in-updateCompany-controller",
      error: err.message,
    }),
      res.status(500).json({ error: "internal-server-error" });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.findOneAndDelete({
      $and: [{ _id: id }, { adminId: req.body.userId }],
    });

    res.status(200).json({ message: "Company Deleted" });
  } catch (err) {
    console.log({
      message: "error-in-deleteCompany-controller",
      error: err.message,
    }),
      res.status(500).json({ error: "internal-server-error" });
  }
};

module.exports = {
  addCompany,
  getCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
};
