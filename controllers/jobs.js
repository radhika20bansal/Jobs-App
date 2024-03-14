const Jobs = require('../models/Job');
const {StatusCodes} = require('http-status-codes');

const getAllJobs = async (req, res) => {
    res.status(200).json({msg: 'getAllJobs endpoint'});
}
const getSingleJob = async (req, res) => {
    res.status(200).json({msg: 'getSingleJob endpoint'});
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