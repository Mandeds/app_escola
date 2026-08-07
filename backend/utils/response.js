
export const success = (res, data = null, message = "Sucesso", status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const error = (res, message = "Erro interno", status = 500) => {
  return res.status(status).json({
    success: false,
    message,
    data: null,
  });
};
