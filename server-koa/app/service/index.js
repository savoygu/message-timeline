const _service = module.exports = {}

_service.findAndCountAll = async function (modelObj, options) {
  return {
    rows: await modelObj.find(options.find_con)
      .limit(options.page_size)
      .sort(options.sort)
      .skip(options.page_size * (options.current - 1))
      .exec(),
    count: await modelObj.find(options.find_con).count()
  }
}

_service.findAll = async function (modelObj, condition) {
  return await modelObj.find(condition)
}

_service.findOne = async function (modelObj, condition) {
  return await modelObj.findOne(condition)
}

_service.findById = async function (modelObj, id) {
  return await modelObj.findById(id)
}
_service.create = async function (modelObj, article) {
  return await modelObj.create(article)
}

_service.update = async function (modelObj, setStatement, condition) {
  return await modelObj.update(condition, setStatement, { multi: true })
}

_service.deleteAll = async function (modelObj, condition) {
  return await modelObj.remove(condition)
}

_service.insertAll = async function (modelObj, articles) {
  return await modelObj.create(...articles)
}

_service.count = async function (modelObj, condition) {
  return await modelObj.where(condition).count()
}
