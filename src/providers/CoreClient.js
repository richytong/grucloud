const _ = require("lodash");
const { isEmpty } = require("lodash/fp");
const assert = require("assert");
const { of } = require("rxjs");
const { retryWhen, take, switchMap } = require("rxjs/operators");

const logger = require("../logger")({ prefix: "CoreClient" });
const { tos } = require("../tos");
const identity = (x) => x;
const { retryExpectOk } = require("./Retry");
const {
  getByNameCore,
  findField,
  isUpByIdCore,
  isDownByIdCore,
  logError,
} = require("./Common");

const errorToJSON = (error) => ({
  isAxiosError: true,
  message: error.message,
  name: error.name,
  config: error.config,
  code: error.code,
  response: {
    status: error.response?.status,
    data: error.response?.data,
  },
});

module.exports = CoreClient = ({
  spec,
  type,
  axios,
  pathGet = (id) => `/${id}`,
  pathCreate = () => `/`,
  pathDelete = (id) => `/${id}`,
  pathList = () => `/`,
  verbCreate = "POST",
  isUpByIdFactory,
  configDefault = async ({ name, properties }) => ({
    name,
    ...properties,
  }),
  findName = (item) => findField({ item, field: "name" }),
  findId = (item) => item.id,
  findTargetId = (item) => item.id,
  onResponseGet = identity,
  onResponseList = identity,
  onResponseCreate = identity,
  onResponseDelete = identity,
  cannotBeDeleted = () => false,
  shouldRetryOnError = () => false,
}) => {
  assert(spec);
  assert(type);

  const getByName = ({ name }) => getByNameCore({ name, list, findName });

  const getById = async ({ id }) => {
    logger.debug(`getById ${tos({ type, id })}`);
    assert(id);

    if (isEmpty(id)) {
      throw Error(`getById ${type}: invalid id`);
    }

    if (spec.listOnly) return;

    try {
      const path = pathGet(id);
      logger.debug(`getById path: ${path}`);

      const result = await axios.request(path, {
        method: "GET",
      });
      const data = onResponseGet(result.data);
      logger.debug(`get ${tos(data)}`);
      return data;
    } catch (error) {
      const status = error.response?.status;
      logger.debug(`getById status: ${status}`);
      if (status != 404) {
        logError("getById", error);
        throw errorToJSON(error);
      }
    }
  };

  //TODO same for down
  const isUpById = isUpByIdFactory
    ? isUpByIdFactory(getById)
    : isUpByIdCore({ getById });

  const isDownById = isDownByIdCore({ getById });

  const create = async ({ name, payload, dependencies }) => {
    logger.debug(`create ${type}/${name}, payload: ${tos(payload)}`);
    assert(name);
    assert(payload);
    if (spec.listOnly) return;

    try {
      const path = pathCreate({ dependencies, name });
      logger.debug(`create url: ${path}`);

      const result = await axios.request(path, {
        method: verbCreate,
        data: payload,
      });
      const data = onResponseCreate(result.data);
      logger.debug(`create result: ${tos(data)}`);

      const id = findTargetId(data);
      logger.debug(`create findTargetId: ${id}`);

      assert(id, "no target id from result");
      await retryExpectOk({
        name: `create ${name}`,
        fn: () => isUpById({ id }),
        isOk: (result) => result,
      });
      const resource = await getById({ id });
      logger.debug(`created ${type}/${name}`);
      return onResponseGet(resource);
    } catch (error) {
      logError(`create ${type}/${name}`, error);
      throw errorToJSON(error);
    }
  };

  const list = async () => {
    logger.debug(`list type ${type}`);

    try {
      const path = pathList();
      logger.debug(`list url: ${path}`);
      const result = await axios.request(path, {
        method: "GET",
      });
      const data = onResponseList(result.data);
      return data;
    } catch (error) {
      logError(`list ${type}`, error);
      throw errorToJSON(error);
    }
  };

  const destroy = async ({ id, name }) => {
    logger.debug(`destroy ${tos({ type, name, id })}`);
    if (spec.listOnly) return;

    if (isEmpty(id)) {
      throw Error(`destroy ${type}: invalid id`);
    }

    try {
      const path = pathDelete(id);
      logger.debug(`destroy url: ${path}`);

      const result = await axios.request(path, {
        method: "DELETE",
      });
      const data = onResponseDelete(result.data);
      logger.debug(
        `destroy ${tos({ name, type, id, data })} should be destroyed`
      );

      return data;
    } catch (error) {
      logError(`delete ${type}/${name}`, error);
      throw errorToJSON(error);
    }
  };

  return {
    spec,
    type,
    findId,
    getById,
    getByName,
    findName,
    findName,
    cannotBeDeleted,
    shouldRetryOnError,
    isUpById,
    isDownById,
    create,
    destroy,
    list,
    configDefault,
  };
};
