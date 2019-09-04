import models from 'models'

const getCatalogs = (req, res) => {
  models.Catalog.findAll()
    .then((catalogs) => {
      const mappedCatalogs = catalogs.map((item) => item.toJSON())

      res.json({ catalogs: mappedCatalogs })
    })
}

const createCatalog = (req, res) => {
  const { body: { catalog } } = req

  models.Catalog.create({
    title: catalog.title
  })
    .then(() => res.json({ catalog: catalog, status: 200 }))
}

const updateCatalog = (req, res) => {
  const { body: { catalog } } = req
  const newTitle = catalog.title

  models.Catalog.findOne({
    where: { id: catalog.id }
  })
    .then((catalog) => (
      catalog.update({
        title: newTitle
      })
    ))
    .then(() => {
      res.json({ catalog: catalog, status: 200 })
    })
}

const deleteCatalog = (req, res) => {
  const { body: { catalog } } = req

  models.Catalog.findOne({
    where: { id: catalog.id }
  })
    .then((catalog) => (
      catalog.destroy()
    ))
    .then(() => {
      res.json({ catalog: catalog, status: 200 })
    })
}

export default {
  getCatalogs,
  createCatalog,
  updateCatalog,
  deleteCatalog
}
