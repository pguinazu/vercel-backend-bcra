// api/credit-status.js
const axios = require('axios');

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

module.exports = async (req, res) => {
  const { cuil } = req.query;

  if (!cuil) {
    return res.status(400).json({ error: 'CUIL requerido en la query' });
  }

  try {
    const response = await axios.get(`https://bcra-proxy-railway-production.up.railway.app/consulta/${cuil}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al consultar BCRA:', error.message);
    res.status(500).json({ error: 'No se pudo obtener datos del BCRA' });
  }
};
