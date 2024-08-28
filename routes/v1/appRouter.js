import { Router } from 'express';
import AppController from '../../controllers/appController';


const appRouter = Router();

/**
 * @swagger
 * tags:
 *      name: App
 *      description: App status.
 */

/**
 * @swagger
 * /status:
 *      get:
 *          tags: [App]
 *          summary: Retrieve the status of the api.
 *          responses:
 *              200:
 *                  description: mongodb connection status
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: ojbect
 */
appRouter.get('/status', (req, res) => {
    AppController.appStatus(req, res);
});

export default appRouter;