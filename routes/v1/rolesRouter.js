import { Router } from 'express';
import RolesController from '../../controllers/rolesController';

const rolesRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Roles
 *      description: Roles Routes.
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Retrieve a list of roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: A list of Roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
rolesRouter.get('/roles', (req, res) => {
    if (req.query.roleName)
        RolesController.getRole(req, res);
    else
        RolesController.getAllRoles(req, res);
});

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create new role
 *     tags: [Roles]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string,
 *                 description: The role name.
 *               roleDescription:
 *                 type: string,
 *                 description: The role description.
 *             required:
 *               - roleName
 *               - roleDescription
 *     responses:
 *       201:
 *         description: The role was successfully created
 *         content:
 *           application/json:
 *       400:
 *         description: data is missing
 */
rolesRouter.post('/roles', (req, res) => {
    RolesController.createRole(req, res);
});

/**
 * @swagger
 * /roles/{roleId?}:
 *   get:
 *     summary: Retrieve an role by role ID
 *     tags: [Roles]
 *     parameters:
 *         - in: path
 *           name: roleId
 *           schema:
 *             type: string
 *           required: true
 *           description: role ID
 *         - in: query
 *           name: roleName
 *           schema:
 *             type: string
 *           required: false
 *           description: Retrieve data by role name.
 *     responses:
 *       200:
 *         description: role data
 *         content:
 *           application/json:
 *       404:
 *         description: role not found
 */
rolesRouter.get('/roles/:roleId?', (req, res) => {
    RolesController.getRole(req, res);
});

/**
 * @swagger
 * /roles/{roleId?}:
 *   put:
 *     summary: Update an existing role
 *     tags: [Roles]
 *     parameters:
 *         - in: path
 *           name: roleId
 *           schema:
 *             type: string
 *           required: true
 *           description: role ID
 *         - in: query
 *           name: roleName
 *           schema:
 *             type: string
 *           required: false
 *           description: Retrieve data by role name.
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string,
 *                 description: The role name.
 *               roleDescription:
 *                 type: string,
 *                 description: The role description.
 *             required:
 *               - roleName
 *               - roleDescription
 *     responses:
 *         200:
 *             description: The role was successfully updated
 *             content:
 *                 application/json:
 *         404:
 *             description: role not found
 *         400:
 *             description: data is missing
 */
rolesRouter.put('/roles/:roleId?', (req, res) => {
    RolesController.updateRole(req, res);
});

/**
 * @swagger
 * /roles/{roleId?}:
 *   delete:
 *     summary: Delete specific role
 *     tags: [Roles]
 *     parameters:
 *         - in: path
 *           name: roleId
 *           schema:
 *             type: string
 *           required: true
 *           description: role ID
 *         - in: query
 *           name: roleName
 *           schema:
 *             type: string
 *           required: false
 *           description: Retrieve data by role name.
 *     responses:
 *       200:
 *         description: The role was successfully deleted
 *         content:
 *           application/json:
 *       404:
 *         description: role not found.
 */
rolesRouter.delete('/roles/:roleId?', (req, res) => {
    RolesController.deleteRole(req, res);
});

export default rolesRouter;