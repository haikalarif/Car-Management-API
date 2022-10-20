const { cars, operations } = require("../models");

module.exports = {
    findAll() {
        return cars.findAll({
            include: [{ model: operations }],
        });
    },
    
    find(id) {
        return cars.findByPk(id, {
            include: [{ model: operations }],
        });
    },

    findAllDeleted(showDeleted = true) {
        return cars.findAll({
            include: [{ model: operations }],
            paranoid: !showDeleted,
        });
    },

    getCountCar() {
        return cars.count();
    },

    create(createArgs) {
        return cars.create(createArgs);
    },

    update(id, updateArgs) {
        return cars.update(updateArgs, {
            where: {
                id,
            },
        });
    },

    delete(id) {
        return cars.destroy({ where: { id } });
    },
};