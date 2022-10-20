const { operations } = require("../models");

module.exports = {
    create(createArgs) {
        return operations.create(createArgs);
    },

    update(idcar, updateArgs) {
        return operations.update(updateArgs, {
            where: {
                idcar,
            },
        });
    },
};