const { NotFoundError } = require('../errors');
const Jobs = require('../models/Job');
const {StatusCodes} = require('http-status-codes');

const getAllJobs = async (req, res) => {
    const jobs = await Jobs.find({createdBy: req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs, count: jobs.length});
}
const getSingleJob = async (req, res) => {
    const {user:{userId}, params:{id:jobId}} = req;
    const singleJob = await Jobs.findOne({_id:jobId, createdBy: userId});
    if(!singleJob){
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({jobs: singleJob});
}
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Jobs.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
}
const updateJob = async (req, res) => {
    res.status(200).json({msg: 'updateJob endpoint'});
}
const deleteJob = async (req, res) => {
    res.status(200).json({msg: 'deleteJob endpoint'});
}

module.exports = {
    getAllJobs, getSingleJob, createJob, updateJob, deleteJob
}