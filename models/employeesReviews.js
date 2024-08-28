import mongoose from "mongoose";

const EmployeesReviewsSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        ref: 'Employees',
        require: true
    },

    review: {
        type: String,
        require: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const EmployeesReviews = mongoose.model('EmployeesReviews', EmployeesReviewsSchema);

export default EmployeesReviews;