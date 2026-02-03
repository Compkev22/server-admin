'use strict';

import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre del torneo es obligatorio'],
        trim: true,
        maxLength: [100, 'El nombre del torneo no puede exceder los 100 caracteres'],
    },
    startDate: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria'],
    },
    endDate: {
        type: Date,
        required: [true, 'La fecha de fin es obligatoria'],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'La descripción no puede exceder los 500 caracteres'],
    },
    photo: {
        type: String,
        default: 'tournaments/default_tournament',
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});

tournamentSchema.index({ isActive: 1 });
tournamentSchema.index({ name: 1 });
tournamentSchema.index({ isActive: 1, name: 1 });

export default mongoose.model('Tournament', tournamentSchema);