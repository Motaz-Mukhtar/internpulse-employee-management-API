import mongoose from "mongoose";

const EmployeesSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },

    lastName: {
        type: String,
        require: true,
    },

    employeeEmail: {
        type: String,
        require: true,
    },

    employeePhoneNumber: {
        type: String,
        reqiure: true,
    },

    departmentId: {
        type: String,
        ref: 'Departments',
        require: true
    },

    roleId: {
        type: String,
        ref: 'Roles',
        require: true,
    },

    address: {
        type: String,
        require: true,
    },

    dateOfBirth: {
        type: Date,
        require: true,
    },

    isEmployeeActive: {
        type: Boolean,
        default: true,
        require: true
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

const Employees = mongoose.model('Employees', EmployeesSchema);

export default Employees;