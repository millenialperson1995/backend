const express = require('express');
const { protectedRoute } = require('../controllers/protectedController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/protected:
 *   get:
 *     summary: Access a protected route
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Protected route accessed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Esta é uma rota protegida
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get('/', authenticateToken, protectedRoute);

module.exports = router;