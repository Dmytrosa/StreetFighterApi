const responseMiddleware = (req, res, next) => {
  if (res.data) {
    // Якщо є дані, передаємо успішну відповідь з користувачем
    res.status(200).json({
      success: true,
      data: res.data,
    });
  } else if (res.err) {
    // Якщо є помилка, передаємо помилкову відповідь з повідомленням про помилку
    res.status(404).json({
      success: false,
      error: res.err,
    });
  } else {
    next();
  }
};

export { responseMiddleware };
