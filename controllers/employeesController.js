import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import Employees from '../models/employeesModel';
import { handleError, handleSuccess } from '../utils/responseHandler';
import EmployeesReviews from '../models/employeesReviews';

// {"status":"success","statusCode":201,"message":"Created","data":{"username":"test","_id":"66c71eea82ce0424b84d1ab7","createdAt":"2024-08-22T11:20:10.791Z","updatedAt":"2024-08-22T11:20:10.792Z","__v":0}}


// createEmployee
// getEmployee
// updateEmployee
// deleteEmployee

class EmployeesController {
    // curl -X POST localhost:4000/api/user/create -H "Content-Type:application/json" -d "{\"username\": \"test\"}"
    static async getAllEmployees(req, res) {
        try {
            const employees = await Employees.find({});

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: employees,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async createEmployee(req, res) {
        try {
            console.log(req.body)
            const {
                firstName,
                lastName,
                employeeEmail,
                employeePhoneNumber,
                departmentId,
                roleId,
                address,
                dateOfBirth,
            } = req.body;

            // If employee data is missing, return bad request error (400);
            if (
                !firstName ||
                !lastName || 
                !employeeEmail ||
                !employeePhoneNumber ||
                !departmentId ||
                !roleId ||
                !address ||
                !dateOfBirth
            ) {
                return handleError({
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: 'data is missing',
                }, res);
            }
    
            let employee = await Employees.findOne({ employeeEmail });
    
            // if the username already exist, return forbidden error (403)
            if (employee) {
                return handleError({
                    statusCode: StatusCodes.FORBIDDEN,
                    message: `the employee is already exist`,
                }, res);
            }
    
            employee = await Employees.create({
                firstName,
                lastName ,
                employeeEmail,
                employeePhoneNumber,
                departmentId,
                roleId,
                address,
                dateOfBirth,
            });
    
            await employee.save();
    
            return handleSuccess({
                status: StatusCodes.CREATED,
                message: getReasonPhrase(StatusCodes.CREATED),
                data: employee,
            }, res);
        } catch (error) {
            console.log(error.message);
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async getEmployee(req, res) {
        try {
            // employee id from req parameter
            const {
                employeeId
            } = req.params;
            
            // Get firstName and lastName from url query parameter
            const firstName = req.query.firstName;
            const lastName = req.query.lastName;

            let employee;

            // if employeeId exists get by employeeId
            // else get user by firstName and lastName
            if (employeeId) {
                if (Types.ObjectId.isValid(employeeId))
                    employee = await Employees.findById(employeeId);
            } else {
                // if firstName or lastName is missing, return forbidden (403).
                if (
                    !firstName ||
                    !lastName
                ) {
                    return handleError({
                        status: StatusCodes.FORBIDDEN,
                        message: 'data is missing',
                    }, res);
                }
                employee = await Employees.findOne({ firstName, lastName });
            }

            console.log(employee);

            // If employee not exist, return not found error (404)
            if (!employee) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            
            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: employee,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async updateEmployee(req, res) {
        try {
            // Get employee id from req parameter
            const {
                firstNameUpdate,
                lastNameUpdate,
                employeeEmail,
                employeePhoneNumber,
                departmentId,
                roleId,
                address,
                dateOfBirth,
            } = req.body;

            // Get employee id from req url
            const {
                employeeId
            } = req.params;
            
            const firstName = req.query.firstName;
            const lastName = req.query.lastName;

            let employee;

            // if employeeId exists get by employeeId
            // else get employee by firstName and lastName
            if (employeeId) {
                if (Types.ObjectId.isValid(employeeId))
                    employee = await Employees.findById(employeeId);
            } else {
                employee = await Employees.findOne({ firstName, lastName });
            }

            // If employee not exist, return not found error (404);
            if (!employee) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            // Update employee data, and return the new updates data.
            const updatedEmployee = Employees.findByIdAndUpdate(employee._id, {
                firstName: firstNameUpdate,
                lastName: lastNameUpdate,
                employeeEmail,
                employeePhoneNumber,
                departmentId,
                roleId,
                address,
                dateOfBirth,
                updatedAt: Date.now(),
            }, { new: true });


            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: updatedEmployee,
            }, res);

        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async deleteEmployee(req, res) {
        try {
            // Get employee id from req paramter
            const {
                employeeId
            } = req.params;

            // Get firstName and lastName from url query parameter
            const firstName = req.query.firstName;
            const lastName = req.query.lastName;

            let employee;

            // if userId exists get by userId
            // else get user by username
            if (employeeId) {
                if (Types.ObjectId.isValid(employeeId))
                    employee = await Employees.findById(employeeId);
            } else {
                employee = await Employees.findOne({ firstName, lastName });
            }

            if (!employee) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            const deletedEmployee = await Employees.findByIdAndDelete(employee._id);

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: {},
            }, res);
        } catch(error) {
            return handleError({
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async getEmployeeReviews(req, res) {
        try {
            // get employee id from req parameter
            const {
                employeeId
            } = req.params;

            // Validate employee id.
            if(!Types.ObjectId.isValid(employeeId)) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'employee id is not valid',
                }, res);
            }

            const employeeReviews = await EmployeesReviews.find({ employeeId });

            // if there's no reviews for specific employee, return not found error (404).
            if (!employeeReviews) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: employeeReviews,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }
}

export default EmployeesController;