'use strict';

import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field',
        required: [true, 'El campo deportivo es obligatorio']
    },
    date: {
        type: Date,
        required: [true, 'La fecha de la reserva es obligatoria']
    },
    timeSlot: {
        type: String,
        required: [true, 'El horario es requerido']
    },
    totalPrice: {
        type: Number,
        required: [true, 'El precio total es requerido'],
        min: [0, 'El precio no puede ser negativo']
    },
    status: {
        type: String,
        enum: {
            values: ['PENDIENTE', 'CONFIRMADO', 'CANCELADO'],
            message: 'Estado de reserva no válido'
        },
        default: 'PENDIENTE'
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

reservationSchema.index({ status: 1 });
reservationSchema.index({ date: 1 });

export default mongoose.model('Reservation', reservationSchema);