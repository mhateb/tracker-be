import models from 'models'

const registerUser = (req, res) => {
  const { body: { user } } = req

  models.User.findOrCreate({
    where: {
      email: user.email
    },
    defaults: {
      username: user.username,
      salt: 'salt',
      hash: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      about: 'about hahahah'
    }
  })
    .then(([newUser, created]) => {
      if (created) {
        res.json({ user: newUser.toJSON() })
      } else {
        res.status(422).json({
          errors: {
            email: 'email is already taken'
          }
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.json({ error: err.message })
    })
}

const loginUser = (req, res) => {
  const { body: { user } } = req

  models.User.findOne({
    where: {
      email: user.email
    }
  })
    .then(foundUser => {
      if (foundUser == null) {
        res.status(401).json({ message: 'no such user found' })
      } else {
        foundUser.validatePassword(user.password)
          ? res.status(200).json({ user: foundUser.toJSON() })
          : res.status(401).json({ message: 'passwords did not match' })
      }
    })
    .catch((err) => {
      res.json({ error: err })
    })
}

const getCurrentUser = (req, res) => {
  return res.json({
    user: req.user.toJSON()
  })
}

export default {
  registerUser,
  loginUser,
  getCurrentUser
}
