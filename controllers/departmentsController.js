import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Types } from 'mongoose';
import Departments from "../models/departmentsModel";
import { handleError, handleSuccess } from "../utils/responseHandler";

class DepartmentsController {
    static async getAllDepartments(req, res) {
        try {
            // Retrieve all departments data.
            const departments = await Departments.find({});

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: departments,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }
    static async createDepartment(req, res) {
        try {
            // get department data from req body
            const {
                departmentName,
            } = req.body;

            // If department data is missing, return bad request error (400)
            if (!departmentName) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'data is missing',
                }, res);
            }

            if (await Departments.findOne({ departmentName })) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'department is already exists',
                }, res);
            }

            const department = await Departments.create({
                departmentName,
            });

            await department.save();

            return handleSuccess({
                status: StatusCodes.CREATED,
                message: getReasonPhrase(StatusCodes.CREATED),
                data: department,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async getDepartment(req, res) {
        try {
            // get department id from req parameter.
            const {
                departmentId
            } = req.params;

            // get department name from url query parameter
            const departmentName = req.query.departmentName;
        
            let department;

            if (departmentId) {
                if (Types.ObjectId.isValid(departmentId))
                    department = await Departments.findById(departmentId);
            } else {
                department = await Departments.findOne({ departmentName });
            }

            if (!department) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: department,
            }, res);
        } catch(error) {
            console.log(error.message);
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async updateDepartment(req, res) {
        try {
            // get new data from req body
            const departmentNameUpdate = req.body.departmentName;

            // get department id from req parameter.
            const {
                departmentId
            } = req.params;

            // get department name from url query parameter
            const departmentName = req.query.departmentName;

            let department;

            if (departmentId) {
                if (Types.ObjectId.isValid(departmentId))
                    department = await Departments.findById(departmentId);
            } else {
                department = await Departments.findOne({ departmentName });
            }

            if (!department) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            // Update department data.
            const updatedDepartment = await Departments.findByIdAndUpdate(department._id, {
                departmentName: departmentNameUpdate,
                updatedAt: Date.now(),
            }, { new: true });

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: updatedDepartment,
            }, res)
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async deleteDepartment(req, res) {
        try {
            // get department id from req parameter.
            const {
                departmentId
            } = req.params;

            // get department name from url query parameter
            const departmentName = req.query.departmentName;

            let department;

            if (departmentId) {
                if (Types.ObjectId.isValid(departmentId))
                    department = await Departments.findById(departmentId);
            } else {
                department = await Departments.findOne({ departmentName });
            }

            if (!department) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            // Delete department from mongodb.
            const deletedDepartment = await Departments.findByIdAndDelete(department._id);

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

export default DepartmentsController;