import { Schema, model } from 'mongoose';

const teamSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre del equipo es requerido'],
        unique: true
    },
    category: {
        type: String,
        required: [true, 'La categoría es requerida']
    },
    logo: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default model('Team', teamSchema);