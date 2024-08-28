import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import { handleError, handleSuccess } from "../utils/responseHandler";
import EmployeesReviews from "../models/employeesReviews";

class EmployeesReviewsController {
    static async getAllReviews(req, res) {
        try {
            const reviews = await EmployeesReviews.find({});

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: reviews,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async createReview(req, res) {
        try {
            // get review data from req body.
            const {
                employeeId,
                review
            } = req.body;

            if (
                !employeeId ||
                !review
            ) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'data is missing',
                }, res);
            }

            // Validate employee id.
            if (!Types.ObjectId.isValid(employeeId)) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'employee id is not valid',
                }, res);
            }

            const employeeReview = await EmployeesReviews.create({
                employeeId,
                review,
            });

            return handleSuccess({
                status: StatusCodes.CREATED,
                message: getReasonPhrase(StatusCodes.CREATED),
                data: employeeReview,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async getReview(req, res) {
        try {
            // get review id from req parameter
            const {
                reviewId
            } = req.params;

            if (!Types.ObjectId.isValid(reviewId)) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'review id is not valid',
                }, res);
            }

            const review = await EmployeesReviews.findById(reviewId);

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: review,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            }, res);
        }
    }

    static async updateReview(req, res) {
        try {
            // get review data from req body
            const {
                review,
            } = req.body;

            // get review id from req parameter
            const {
                reviewId
            } = req.params;

            if (!review) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'data is missing',
                }, res);
            }

            // Validate review id
            if (!Types.ObjectId.isValid(reviewId)) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'review id is not valid',
                }, res);
            }

            const employeeReview = await EmployeesReviews.findById(reviewId);

            // If employee review doesn't exist, return not found error (404).
            if (!employeeReview) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            const updatedReview = await EmployeesReviews.findByIdAndUpdate(reviewId, {
                review,
            }, { new: true });

            return handleSuccess({
                status: StatusCodes.OK,
                message: getReasonPhrase(StatusCodes.OK),
                data: updatedReview,
            }, res);
        } catch(error) {
            return handleError({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: getReasonPhrase(StatusCodes),
            }, res);
        }
    }

    static async deleteReview(req, res) {
        try {
            // get review id from req parameter
            const {
                reviewId
            } = req.params;

            if (!Types.ObjectId.isValid(reviewId)) {
                return handleError({
                    status: StatusCodes.FORBIDDEN,
                    message: 'review id is not valid',
                }, res);
            }

            const employeeReview = await EmployeesReviews.findById(reviewId);

            if (!employeeReview) {
                return handleError({
                    status: StatusCodes.NOT_FOUND,
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                }, res);
            }

            const deletedReview = await EmployeesReviews.findByIdAndDelete(reviewId);

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
};

export default EmployeesReviewsController;