module.exports = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Body:', req.body);
  }

  next();
};
