import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema({
    roleName: {
        type: String,
        require: true,
    },

    roleDescription: {
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

const Roles = mongoose.model('Roles', RolesSchema);

export default Roles;