export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password; // Вытаскиваю пароль из body перед созданием документа (doc)
    const salt = await bcrypt.genSalt(10); //генерация строки символов
    const hash = await bcrypt.hash(password, salt); //шифрование пароля с помощью алгоритма salt

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save(); // сохраняю в базе

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d", // токен будет не валидным через 30 дней
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};
