import mongoose from "mongoose";

const ProjectsSchema = new mongoose.Schema({
    projectName: {
        type: String,
        require: true,
    },

    projectDescription: {
        type: String,
        require: true,
    },

    startDate: {
        type: Date,
        require: true,
    },

    endDate: {
        type: Date,
        require: true
    },

    projectStatus: {
        type: String,
        require: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Projects = mongoose.model('Projects', ProjectsSchema);

export default Projects;