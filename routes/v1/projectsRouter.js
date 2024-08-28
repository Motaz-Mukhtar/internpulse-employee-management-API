import { Router } from 'express';
import ProjectsController from '../../controllers/projectsController';

const projectsRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Projects
 *      description: Projects Routes.
 */


/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retrieve a list of projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
projectsRouter.get('/projects', (req, res) => {
    if (req.query.projectName)
        ProjectsController.getProject(req, res);
    else
        ProjectsController.getAllProjects(req, res);
});

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create new project
 *     tags: [Projects]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string,
 *                 description: The project name.
 *               projectDescription:
 *                 type: string,
 *                 description: The project description and details.
 *               startDate:
 *                 type: date,
 *                 description: The start date of the project.
 *               endDate:
 *                 type: date,
 *                 description: The end date of the project.
 *               projectStatus:
 *                 type: string,
 *                 description: The current status of the project.
 *             required:
 *               - projectName
 *               - projectDescription
 *               - startDate
 *               - endDate
 *               - projectStatus
 *     responses:
 *       201:
 *         description: The project was successfully created
 *         content:
 *           application/json:
 *       400:
 *         description: data is missing
 */
projectsRouter.post('/projects', (req, res) => {
    ProjectsController.createProject(req, res);
});

/**
 * @swagger
 * /projects/{projectId?}:
 *   get:
 *     summary: Retrieve an project by project ID
 *     tags: [Projects]
 *     parameters:
 *         - in: path
 *           name: projectId
 *           schema:
 *             type: string
 *           required: true
 *           description: project ID
 *         - in: query
 *           name: projectName
 *           schema:
 *             type: string
 *           required: false
 *           description: Retrieve data by project name.
 *     responses:
 *       200:
 *         description: project data
 *         content:
 *           application/json:
 *       404:
 *         description: project not found
 */
projectsRouter.get('/projects/:projectId?', (req, res) => {
    ProjectsController.getProject(req, res);
});

/**
 * @swagger
 * /projects/{projectId?}:
 *   put:
 *     summary: Update an existing project
 *     tags: [Projects]
 *     parameters:
 *         - in: path
 *           name: projectId
 *           schema:
 *             type: string
 *           required: true
 *           description: project ID
 *         - in: query
 *           name: projectName
 *           schema:
 *             type: string
 *           required: false
 *           description: Retrieve data by project name.
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string,
 *                 description: The project name.
 *               projectDescription:
 *                 type: string,
 *                 description: The project description and details.
 *               startDate:
 *                 type: date,
 *                 description: The start date of the project.
 *               endDate:
 *                 type: date,
 *                 description: The end date of the project.
 *               projectStatus:
 *                 type: string,
 *                 description: The current status of the project.
 *             required:
 *               - projectName
 *               - projectDescription
 *               - startDate
 *               - endDate
 *               - projectStatus
 *     responses:
 *       200:
 *         description: The project was successfully created
 *         content:
 *           application/json:
 *       404:
 *         description: project not found
 *       400:
 *         description: data is missing
 */
projectsRouter.put('/projects/:projectId?', (req, res) => {
    ProjectsController.updateProject(req, res);
});

/**
 * @swagger
 * /projects/{projectId?}:
 *   delete:
 *     summary: Delete specific project
 *     tags: [Projects]
 *     parameters:
 *         - in: path
 *           name: projectId
 *           schema:
 *             type: string
 *           required: true
 *           description: project ID
 *         - in: query
 *           name: projectName
 *           schema:
 *             type: string
 *           required: false
 *           description: Retrieve data by project name.
 *     responses:
 *       200:
 *         description: The project was successfully deleted
 *         content:
 *           application/json:
 *       404:
 *         description: project not found.
 */
projectsRouter.delete('/projects/:projectId?', (req, res) => {
    ProjectsController.deleteProject(req, res);
});

export default projectsRouter;