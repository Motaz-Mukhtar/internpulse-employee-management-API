import { Router } from "express";
import EmployeesController from "../../controllers/employeesController";

const employeesRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Employees
 *      description: Employee Routes.
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Retrieve a list of employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
employeesRouter.get('/employees', (req, res) => {
    if (req.query.firstName || req.query.lastName)
        EmployeesController.getEmployee(req, res);
    else
        EmployeesController.getAllEmployees(req, res);
});

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create new employee
 *     tags: [Employees]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the employee
 *               lastName:
 *                 type: string
 *                 description: The last name of the employee
 *               employeeEmail:
 *                 type: string
 *                 description: The email of the employee
 *               roleId:
 *                 type: string
 *                 description: The role ID of the employee
 *               departmentId:
 *                 type: string
 *                 description: The department ID of the employee
 *               address:
 *                 type: string
 *                 description: The address of the employee
 *               dateOfBirth:
 *                 type: date
 *                 description: The date birth of the employee
 *               employeePhoneNumber:
 *                 type: string,
 *                 description: The employee phone number.
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *     responses:
 *       201:
 *         description: The employee was successfully created
 *         content:
 *           application/json:
 *       400:
 *         description: data is missing
 */
employeesRouter.post('/employees', (req, res) => {
    EmployeesController.createEmployee(req, res);
});

/**
 * @swagger
 * /employees/{employeeId?}:
 *   get:
 *     summary: Retrieve an employee by employee ID
 *     tags: [Employees]
 *     parameters:
 *         - in: path
 *           name: employeeId
 *           schema:
 *             type: string
 *           required: true
 *           description: employee ID
 *         - in: query
 *           name: firstName
 *           schema:
 *             type: string
 *           required: false
 *           description: employee first name (add the last name also)
 *         - in: query
 *           name: lastName
 *           schema:
 *             type: string
 *           required: false
 *           description: employee last name (add the first name also)
 *     responses:
 *       200:
 *         description: employee data
 *         content:
 *           application/json:
 *       404:
 *         description: employee not found
 */
employeesRouter.get('/employees/:employeeId?', (req, res) => {
    EmployeesController.getEmployee(req, res);
});

/**
 * @swagger
 * /employee/{employeeId?}:
 *   put:
 *     summary: Updat an existing employee
 *     tags: [Employees]
 *     parameters:
 *         - in: path
 *           name: employeeId
 *           schema:
 *             type: string
 *           required: true
 *           description: employee ID
 *         - in: query
 *           name: firstName
 *           schema:
 *             type: string
 *           required: false
 *           description: employee first name (add the last name also)
 *         - in: query
 *           name: lastName
 *           schema:
 *             type: string
 *           required: false
 *           description: employee last name (add the first name also)
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *              schema:
 *                 type: object
*             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the employee
 *               lastName:
 *                 type: string
 *                 description: The last name of the employee
 *               employeeEmail:
 *                 type: string
 *                 description: The email of the employee
 *               roleId:
 *                 type: string
 *                 description: The role ID of the employee
 *               departmentId:
 *                 type: string
 *                 description: The department ID of the employee
 *               address:
 *                 type: string
 *                 description: The address of the employee
 *               dateOfBirth:
 *                 type: date
 *                 description: The date birth of the employee
 *               employeePhoneNumber:
 *                 type: string,
 *                 description: The employee phone number.
 *     responses:
 *         200:
 *             description: The employee was successfully updated
 *             content:
 *                 application/json:
 *         404:
 *             description: employee not found
 *         400:
 *             description: data is missing
  */
employeesRouter.put('/employees/:employeeId?', (req, res) => {
    EmployeesController.updateEmployee(req, res);
});

/**
 * @swagger
 * /employees/{employeeId?}:
 *   delete:
 *     summary: Delete an employee by employee ID
 *     tags: [Employees]
 *     parameters:
 *         - in: path
 *           name: employeeId
 *           schema:
 *             type: string
 *           required: true
 *           description: employee ID
 *         - in: query
 *           name: firstName
 *           schema:
 *             type: string
 *           required: false
 *           description: employee first name (add the last name also)
 *         - in: query
 *           name: lastName
 *           schema:
 *             type: string
 *           required: false
 *           description: employee last name (add the first name also)
 *     responses:
 *       200:
 *         description: employee data
 *         content:
 *           application/json:
 *       404:
 *         description: employee not found
 */
employeesRouter.delete('/employees/:employeeId?', (req, res) => {
    EmployeesController.deleteEmployee(req, res);
});

/**
 * @swagger
 * /employees/{employeeId?}/reviews:
 *   get:
 *     summary: Retrieve an employee reviews by employee id
 *     tags: [Employees]
 *     parameters:
 *         - in: path
 *           name: employeeId
 *           schema:
 *             type: string
 *           required: true
 *           description: employee ID
 *         - in: query
 *           name: firstName
 *           schema:
 *             type: string
 *           required: false
 *           description: employee first name (add the last name also).
 *         - in: query
 *           name: lastName
 *           schema:
 *             type: string
 *           required: false
 *           description: employee last name (add the first name also).
 *     responses:
 *       200:
 *         description: employee reviews data.
 *         content:
 *           application/json:
 *       404:
 *         description: no reviews about the employee.
 */
employeesRouter.get('/employees/:employeeId/reviews', (req, res) => {
    EmployeesController.getEmployeeReviews(req, res);
});

export default employeesRouter;