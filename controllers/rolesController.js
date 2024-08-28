import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import Roles from "../models/roleModel";
import { handleError, handleSuccess } from "../utils/responseHandler";

class RolesController {
    static async getAllRoles(req, res) {
        try {
            const roles = await Roles.find({});

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: roles,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async createRole(req, res) {
        try {
            // Get role data from req body
            const {
                roleName,
                roleDescription
            } = req.body;

            // If role data is missing, return bad request error (400).
            if (
                !roleName ||
                !roleDescription
            ) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'data is missing',
                }, res);
            }

            if (await Roles.findOne({ roleName })) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'role name is already exists',
                }, res);
            }

            const role = await Roles.create({
                roleName,
                roleDescription,
            });

            await role.save();

            return handleSuccess({
                status: StatusCodes.CREATED,
                message: getReasonPhrase(StatusCodes.CREATED),
                data: role,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async getRole(req, res) {
        try {
            // get role id from req parameter.
            const {
                roleId
            } = req.params;

            // get role name from url query parameter
            const roleName = req.query.roleName;
        
            let role;

            // Validate role id
            if (roleId) {
                if (Types.ObjectId.isValid(roleId))
                    role = await Roles.findById(roleId);
            } else {

                // role = await Roles.findOne({ roleName });
                role = await Roles.findOne({ roleName })
            }

            // If role does not exist, return not found error (404).
            if (!role) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: role,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async updateRole(req, res) {
        try {
            // Get role data from req body
            const roleNameUpdate = req.body.roleName;
            const roleDescriptionUpdate = req.body.roleDescription;

            // get role id from req parameter.
            const {
                roleId
            } = req.params;

            // get role name from url query parameter
            const roleName = req.query.roleName;
        
            let role;

            // Validate role id
            if (roleId) {
                if (Types.ObjectId.isValid(roleId))
                    role = await Roles.findById(roleId);
            } else {
                role = await Roles.findOne({ roleName });
            }

            // Update role data.
            const updatedRole = await Roles.findByIdAndUpdate(role._id, {
                roleName: roleNameUpdate,
                roleDescription: roleDescriptionUpdate,
            }, { new: true });

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: updatedRole,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async deleteRole(req, res) {
        try {
            // get role id from req parameter.
            const {
                roleId
            } = req.params;

            // get role name from url query parameter
            const roleName = req.query.roleName;

            let role;

            // Validate role id
            if (roleId) {
                if (Types.ObjectId.isValid(roleId))
                    role = await Roles.findById(roleId);
            } else {
                role = await Roles.findOne({ roleName });
            }

            // Delete role from mongodb.
            const deletedRole = await Roles.findByIdAndDelete(role._id);

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: {}
            }, res);
        } catch(error) {
            console.log(error.message);
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }
}

export default RolesController;