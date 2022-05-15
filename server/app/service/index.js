module.exports = {
  findAndCountAll: async (Model, options) => ({
    rows: await Model.find(options.find_con)
      .limit(options.page_size)
      .sort(options.sort)
      .skip(options.page_size * (options.current - 1))
      .exec(),
    count: await Model.find(options.find_con).count()
  }),
  findAll: async (Model, condition) => await Model.find(condition),
  findOne: async (Model, condition) => await Model.findOne(condition),
  findById: async (Model, id) => await Model.findById(id),
  create: async (Model, document) => await Model.create(document),
  update: async (Model, document, condition) => await Model.update(condition, document, { multi: true }),
  deleteAll: async (Model, condition) => await Model.remove(condition),
  insertAll: async (Model, documents) => await Model.create(...documents),
  count: async (Model, condition) => await Model.where(condition).count()
}
