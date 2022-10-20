const operationsRepository = require("../repositories/operationsRepository");

module.exports = {
    create(createArgs) {
        return operationsRepository.create(createArgs);
    },

    update(id, requestBody) {
        return operationsRepository.update(id, requestBody);
    },
};