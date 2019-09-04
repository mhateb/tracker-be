import models from 'models'

const getVolumes = (req, res) => {
  models.Volume.findAll()
    .then((volumes) => {
      const mappedVolumes = volumes.map((item) => item.toJSON())

      res.json({ volumes: mappedVolumes })
    })
}

const createVolume = (req, res) => {
  const { body: { volume } } = req

  models.Volume.create({
    title: volume.title
  })
    .then(() => res.json({ volume: volume, status: 200 }))
}

const updateVolume = (req, res) => {
  const { body: { volume } } = req
  const newTitle = volume.title

  models.Volume.findOne({
    where: { id: volume.id }
  })
    .then((volume) => (
      volume.update({
        title: newTitle
      })
    ))
    .then(() => {
      res.json({ volume: volume, status: 200 })
    })
}

const deleteVolume = (req, res) => {
  const { body: { volume } } = req

  models.Volume.findOne({
    where: { id: volume.id }
  })
    .then((volume) => (
      volume.destroy()
    ))
    .then(() => {
      res.json({ volume: volume, status: 200 })
    })
}

export default {
  getVolumes,
  createVolume,
  updateVolume,
  deleteVolume
}
