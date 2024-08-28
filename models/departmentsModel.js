import mongoose from "mongoose";

const DepartmentsSchema = new mongoose.Schema({
    departmentName: {
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

const Departments = mongoose.model('Departments', DepartmentsSchema);

export default Departments;