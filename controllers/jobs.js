const { NotFoundError, BadRequestError } = require("../errors");
const Jobs = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getSingleJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const singleJob = await Jobs.findOne({ _id: jobId, createdBy: userId });
  if (!singleJob) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ jobs: singleJob });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position field cannot be empty");
  }

  const job = await Jobs.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if(!job){
    throw new NotFoundError(`No job found with id ${jobId}`);
  }
  res.status(200).json({ job });
};
const deleteJob = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "deleteJob endpoint" });
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
