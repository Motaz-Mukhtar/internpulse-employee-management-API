import { Router } from 'express';
import DepartmentsController from '../../controllers/departmentsController';

const departmentsRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Departments
 *      description: Departments Routes.
 */

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Retrieve a list of departments
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: A list of departments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
departmentsRouter.get('/departments', (req, res) => {
    if (req.query.departmentName)
        DepartmentsController.getDepartment(req, res);
    else
        DepartmentsController.getAllDepartments(req, res);
});

/**
 * @swagger
 * /departments:
 *   post:
 *     summary: Create new department
 *     tags: [Departments]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               departmentName:
 *                 type: string,
 *                 description: The department name.
 *             required:
 *               - departmentName
 *     responses:
 *       201:
 *         description: The department was successfully created
 *         content:
 *           application/json:
 *       400:
 *         description: data is missing
 */
departmentsRouter.post('/departments', (req, res) => {
    DepartmentsController.createDepartment(req, res);
});

/**
 * @swagger
 * /departments/{departmentId?}:
 *   get:
 *     summary: Retrieve an department by department ID
 *     tags: [Departments]
 *     parameters:
 *         - in: path
 *           name: departmentId
 *           schema:
 *             type: string
 *           required: true
 *           description: department ID
 *         - in: query
 *           name: departmentName
 *           schema:
 *             type: string
 *           required: false
 *           description: Retrieve data by department name.
 *     responses:
 *       200:
 *         description: department data
 *         content:
 *           application/json:
 *       404:
 *         description: department not found
 */
departmentsRouter.get('/departments/:departmentId?', (req, res) => {
    DepartmentsController.getDepartment(req, res);
});

/**
 * @swagger
 * /departments/{departmentId?}:
 *   put:
 *     summary: Update an existing department
 *     tags: [Departments]
 *     parameters:
 *         - in: path
 *           name: departmentId
 *           schema:
 *             type: string
 *           required: true
 *           description: department ID
 *         - in: query
 *           name: departmentName
 *           schema:
 *             type: string
 *           required: false
 *           description: Retrieve data by department name.
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               departmentName:
 *                 type: string,
 *                 description: The department name.
 *             required:
 *               - departmentName
 *     responses:
 *         200:
 *             description: The department was successfully updated
 *             content:
 *                 application/json:
 *         404:
 *             description: department not found
 *         400:
 *             description: data is missing
 */
departmentsRouter.put('/departments/:departmentId?', (req, res) => {
    DepartmentsController.updateDepartment(req, res);
});


/**
 * @swagger
 * /departments/{departmentId?}:
 *   delete:
 *     summary: Delete specific department
 *     tags: [Departments]
 *     parameters:
 *         - in: path
 *           name: departmentId
 *           schema:
 *             type: string
 *           required: true
 *           description: department ID
 *         - in: query
 *           name: departmentName
 *           schema:
 *             type: string
 *           required: false
 *           description: Retrieve data by department name.
 *     responses:
 *       200:
 *         description: The department was successfully deleted
 *         content:
 *           application/json:
 *       404:
 *         description: department not found.
 */
departmentsRouter.delete('/departments/:departmentId?', (req, res) => {
    DepartmentsController.deleteDepartment(req, res);
});

export default departmentsRouter;