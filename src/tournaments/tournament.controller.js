import Tournament from './tournament.model.js';
import { cloudinary } from '../../middlewares/file-uploaders.js';

export const getTournaments = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;

        const filter = { isActive };

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        };

        const tournaments = await Tournament.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(options.sort);

        const total = await Tournament.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: tournaments,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener torneos',
            error: error.message
        });
    }
};

export const getTournamentById = async (req, res) => {
    try {
        const { id } = req.params;

        const tournament = await Tournament.findById(id);

        if (!tournament)
            return res.status(404).json({
                success: false,
                message: 'Torneo no encontrado'
            });
        res.status(200).json({
            success: true,
            data: tournament
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener torneo',
            error: error.message
        });
    }
};

export const createTournament = async (req, res) => {
    try {
        const data = req.body;

        if (req.file) {
            const extension = req.file.path.split('.').pop();
            const filename = req.file.filename;
            const relativePath = filename.substring(filename.indexOf('tournaments/'));

            data.photo = `${relativePath}.${extension}`;
        } else {
            data.photo = 'tournaments/default_tournament';
        }

        const tournament = new Tournament(data);
        await tournament.save();

        res.status(201).json({
            success: true,
            message: 'Torneo creado exitosamente',
            data: tournament
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear torneo',
            error: error.message
        });
    }
};

export const updateTournament = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            const current = await Tournament.findById(id);

            if (current && current.photo) {
                const publicId = `kinal_sports/${current.photo.split('.')[0]}`;
                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (e) {
                    console.error(e.message);
                }
            }

            const filename = req.file.filename;
            const relativePath = filename.includes('tournaments/') ? filename.substring(filename.indexOf('tournaments/')) : filename;
            updateData.photo = `${relativePath}.${req.file.path.split('.').pop()}`;
        }

        const tournament = await Tournament.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!tournament)
            return res.status(404).json({
                success: false,
                message: 'Torneo no encontrado'
            });

        res.status(200).json({
            success: true,
            message: 'Torneo actualizado',
            data: tournament
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar',
            error: error.message
        });
    }
};

export const changeTournamentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activate');

        const tournament = await Tournament.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!tournament)
            return res.status(404).json({
                success: false,
                message: 'Torneo no encontrado'
            });

        res.status(200).json({
            success: true,
            message: `Torneo ${isActive ? 'activado' : 'desactivado'}`,
            data: tournament
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error de estado',
            error: error.message
        });
    }
};