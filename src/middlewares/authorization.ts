const authorization = async (req: any, res: any, next: any) => {
  if (req.user.role !== 'admin') {
    return res.status(400).send({
      message: 'Permission denied'
    });
  }
  next();
};

export default authorization;
