import Reservation from './reservation.model.js';

export const getReservations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const reservations = await Reservation.find()
    .populate('field')
    .limit(limit * 1)
    .skip((page - 1) * limit);
    
    const total = await Reservation.countDocuments();

    res.status(200).json({ 
        success: true, 
        data: reservations, 
        pagination: { 
            totalRecords: total, 
            limit 
        } });
  } catch (error) {
    res.status(500).json({ 
        success: false, 
        error: error.message 
    });
  }
};

export const getReservationById = async (req, res) => {
  try {
    
    const reservation = await Reservation.findById(req.params.id).populate('field');
    
    if (!reservation) 
        return res.status(404).json({ 
        success: false, 
        message: 'No encontrada' 
    });

    res.status(200).json({ 
        success: true,
        data: reservation 
    });
  } catch (error) {
    res.status(500).json({
        success: false, 
        error: error.message 
    });
  }
};

export const createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json({ 
        success: true, 
        message: 'Reserva creada', 
        data: reservation 
    });
  } catch (error) {
    res.status(400).json({ 
        success: false, 
        error: error.message 
    });
  }
};

export const confirmReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
        req.params.id, 
        { status: 'CONFIRMADO' }, 
        { new: true }
    );
    res.status(200).json({ 
        success: true, 
        message: 'Reserva confirmada', 
        data: reservation 
    });
  } catch (error) {
    res.status(400).json({ 
        success: false, 
        error: error.message 
    });
  }
};