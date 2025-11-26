function validateId(req, res, next) {
  const { id } = req.params;
  if (Number.isNaN(+id)) return res.status(400).json({ message: 'Put number id' });
  return next();
}

module.exports = validateId;
