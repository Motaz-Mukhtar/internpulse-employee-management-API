import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import appRouter from './routes/v1/appRouter';
import employeesRouter from './routes/v1/employeesRouter';
import departmentsRouter from './routes/v1/departmentsRouter';
import rolesRouter from './routes/v1/rolesRouter';
import projectsRouter from './routes/v1/projectsRouter';
import employeesReviewsRouter from './routes/v1/employeesreviewsRouter';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Path to swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1', appRouter);
app.use('/api/v1', employeesRouter);
app.use('/api/v1', departmentsRouter);
app.use('/api/v1', rolesRouter);
app.use('/api/v1', projectsRouter);
app.use('/api/v1', employeesReviewsRouter);

app.listen(PORT, () => {
    console.log(`\n\n Server is running in PORT ${PORT} \n\n`);
});