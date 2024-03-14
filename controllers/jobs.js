const getAllJobs = async (req, res) => {
    res.status(200).json({msg: 'getAllJobs endpoint'});
}
const getSingleJob = async (req, res) => {
    res.status(200).json({msg: 'getSingleJob endpoint'});
}
const createJob = async (req, res) => {
    res.status(200).json(req.user);
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