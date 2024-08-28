import { Router } from 'express';
import EmployeesReviewsController from '../../controllers/employeesReviewsController';

const employeesReviewsRouter = Router();

/**
 * @swagger
 * tags:
 *      name: EmployeesReviews
 *      description: Employees Reviews Routes.
 */

/**
 * @swagger
 * /employees-reviews:
 *   get:
 *     summary: Retrieve a list of employees reviews
 *     tags: [EmployeesReviews]
 *     responses:
 *       200:
 *         description: A list of employees reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
employeesReviewsRouter.get('/employees-reviews', (req, res) => {
    EmployeesReviewsController.getAllReviews(req, res);
});

/**
 * @swagger
 * /employees-reviews:
 *   post:
 *     summary: Create new review for specific employee
 *     tags: [EmployeesReviews]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string,
 *                 description: The employee Id.
 *               review:
 *                 type: string,
 *                 description: The review for employee.
 *             required:
 *               - employeeId
 *               - review
 *     responses:
 *       201:
 *         description: The employee review was successfully created
 *         content:
 *           application/json:
 *       400:
 *         description: data is missing
 */
employeesReviewsRouter.post('/employees-reviews', (req, res) => {
    EmployeesReviewsController.createReview(req, res);
});

/**
 * @swagger
 * /employees-reviews/{reviewId?}:
 *   get:
 *     summary: Retrieve an employee review by review ID
 *     tags: [EmployeesReviews]
 *     parameters:
 *         - in: path
 *           name: reviewId
 *           schema:
 *             type: string
 *           required: true
 *           description: review ID
 *     responses:
 *       200:
 *         description: employee review data
 *         content:
 *           application/json:
 *       404:
 *         description: employee review not found
 */
employeesReviewsRouter.get('/employees-reviews/:reviewId', (req, res) => {
    EmployeesReviewsController.getReview(req, res);
});

/**
 * @swagger
 * /employees-reviews/{reviewId?}:
 *   put:
 *     summary: Update an existing employee review
 *     tags: [EmployeesReviews]
 *     parameters:
 *         - in: path
 *           name: reviewId
 *           schema:
 *             type: string
 *           required: true
 *           description: review ID
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string,
 *                 description: The employee Id.
 *               review:
 *                 type: string,
 *                 description: The review for employee.
 *             required:
 *               - employeeId
 *               - review
 *     responses:
 *         200:
 *             description: The employee review was successfully updated
 *             content:
 *                 application/json:
 *         404:
 *             description: employee review not found
 *         400:
 *             description: data is missing
 */
employeesReviewsRouter.put('/employees-reviews/:reviewId', (req, res) => {
    EmployeesReviewsController.updateReview(req, res);
});

/**
 * @swagger
 * /employees-reviews/{reviewId?}:
 *   delete:
 *     summary: Delete specific employee review
 *     tags: [EmployeesReviews]
 *     parameters:
 *         - in: path
 *           name: reviewId
 *           schema:
 *             type: string
 *           required: true
 *           description: review ID
 *     responses:
 *       200:
 *         description: The employee review was successfully deleted
 *         content:
 *           application/json:
 *       404:
 *         description: employee review not found.
 */
employeesReviewsRouter.delete('/employees-reviews/:reviewId', (req, res) => {
    EmployeesReviewsController.deleteReview(req, res);
});

export default employeesReviewsRouter;