export function getMessageError (res, error) {
  res.status(422).json({ err: error.errors.map((e) => {
    return e.message
  }) })
}
