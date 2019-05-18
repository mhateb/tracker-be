export function getMessageError (res, error) {
  res.status(422).json({ err: error })
}
