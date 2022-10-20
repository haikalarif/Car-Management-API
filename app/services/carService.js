const carRepository = require("../repositories/carRepository");
const { operations } = require("../models");

module.exports = {
    get(id) {
        return carRepository.find(id);
    },

    async list() {
        try {
            const cars = await carRepository.findAll({
                include: [{ model: operations }],
            });
            const totalCar = await carRepository.getCountCar();

            return {
                data: cars,
                count: totalCar,
            };
        } catch (error) {
            throw error;
        }
    },

    async listAllDeleted(showDeleted = true) {
        try {
            const cars = await carRepository.findAllDeleted(showDeleted);
            return {
                data: cars,
            };
        } catch (error) {
            throw error;
        }
    },
    
    create(requestBody) {
        return carRepository.create(requestBody);
    },

    update(id, requestBody) {
        return carRepository.update(id, requestBody);
    },
    
    delete(id) {
        return carRepository.delete(id);
    },

}