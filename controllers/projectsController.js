import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import Projects from '../models/projectsModel';
import { handleError, handleSuccess } from '../utils/responseHandler';

class ProjectsController {
    static async getAllProjects(req, res) {
        try {
            const projects = await Projects.find({});

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: projects,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async createProject(req, res ) {
        try {
            // get project data from req body.
            const {
                projectName,
                projectDescription,
                startDate,
                endDate,
                projectStatus
            } = req.body;

            if (
                !projectName ||
                !projectDescription ||
                !startDate ||
                !endDate ||
                !projectStatus
            ) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'data is missing',
                }, res);
            }

            if (await Projects.findOne({ projectName })) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'Project name is already exist',
                }, res);
            }

            const project = await Projects.create({
                projectName,
                projectDescription,
                startDate,
                endDate,
                projectStatus
            });

            return handleSuccess({
                status: StatusCodes.CREATED,
                message: getReasonPhrase(StatusCodes.CREATED),
                data: project,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async getProject(req, res) {
        try {
            // get project id from req parameter.
            const {
                projectId
            } = req.params;

            // get project name from url query parameter
            const projectName = req.query.projectName;
        
            let project;

            // Validate project id
            if (projectId) {
                if (Types.ObjectId.isValid(projectId))
                    project = await Projects.findById(projectId);
            } else {
                project = await Projects.findOne({ projectName });
            }

            // If project does not exist, return not found error (404).
            if (!project) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            // return project data wit success message
            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: project,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async updateProject(req, res) {
        try {
            // get project data from req body
            const projectNameUpdate = req.body.projectName;

            const {
                projectDescription,
                startDate,
                endDate,
                projectStatus
            } = req.body;

            if (
                !projectNameUpdate &&
                !startDate &&
                !endDate &&
                !projectStatus
            ) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'data is missing',
                }, res);
            }

            // get project id from req parameter.
            const {
                projectId
            } = req.params;

            // get project name from url query parameter
            const projectName = req.query.projectName;
        
            let project;

            // Validate project id
            if (projectId) {
                if (Types.ObjectId.isValid(projectId))
                    project = await Projects.findById(projectId);
            } else {
                project = await Projects.findOne({ projectName });
            }

            // If project does not exist, return not found error (404).
            if (!project) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            // Update project data in mongodb.
            const updatedProject = await Projects.findByIdAndUpdate(project._id, {
                projectName: projectNameUpdate,
                projectDescription,
                startDate,
                endDate,
                projectStatus
            }, { new: true });

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: updatedProject,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async deleteProject(req, res) {
        try {
            // get project id from req parameter.
            const {
                projectId
            } = req.params;

            // get project name from url query parameter
            const projectName = req.query.projectName;
        
            let project;

            // Validate project id
            if (projectId) {
                if (Types.ObjectId.isValid(projectId))
                    project = await Projects.findById(projectId);
            } else {
                project = await Projects.findOne({ projectName });
            }

            // If project does not exist, return not found error (404).
            if (!project) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            // Delete project from mongodb.
            const deletedProject = await Projects.findByIdAndDelete(project._id);

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: {},
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }
}

export default ProjectsController;