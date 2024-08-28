import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee Management API',
      version: '1.0.0',
      description: 'A simple Employee Management API',
    },
    servers: [
      {
        url: 'http://localhost:4000/api/v1', // Replace with your actual server URL
      },
    ],
  },
  apis: ['./routes/v1/*.js'], // Path to your API route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
