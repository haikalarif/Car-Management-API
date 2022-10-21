const carService = require("../../../services/carService");
const userService = require("../../../services/userService");
const operationsService = require("../../../services/operationsService");
const { listAllRoles } = require("./userController");
const { operations, typeusers } = require("../../../models");
const fs = require("fs");
const path = require("path");

module.exports = {
    async list(req, res) {
        try {
            const cars = await carService.list({
                include: [{ model: operations }],
            });
            if (cars.length === 0) {
                res.status(404).json({
                    message: "Cars not found, Please Insert Cars"
                });
                return;
            }
            const roles = await typeusers.findAll();
            res.status(200).json({
                status: "OK",
                cars,
                operations,
                roles,
            });
        } catch (error) {
            res.status(400).json({
                status: "FAIL",
                message: error.message,
            });
        }
    },

    async show(req, res) {
        try {
            const car = await carService.get(req.params.id);
            if (!car) {
                res.status(404).json({
                    status: "FAIL",
                    message: "Car not found",
                });
                return;
            }
            const user = await userService.find(car.operations[0].iduser);
            const userInfo = {
                id: user.id,
                email: user.email,
            };
            const roles = await typeusers.findAll();
            const data = {
                car,
                userInfo,
                roles,
            };
            res.status(200).json({
                status: "OK",
                data: data,
            });
        } catch (error) {
            res.status(422).json({
                status: "FAIL",
                message: error.message,
            });
        }
    },

    async showDeleted(req, res) {
        try {
            const cars = await carService.listAllDeleted();
            if (cars.length === 0) {
                res.status(404).json({
                    message: "Cars are empty, please insert the data"
                });
                return
            }
            res.status(200).json({
                status: "OK",
                data: cars,
            });
        } catch (error) {
            res.status(400).json({
                status: "FAIL",
                message: error.message,
            });
        }
    },

    async create(req, res) {
        try {
            if (req.body == null) {
                res.status(400).json({
                    status: "FAIL",
                    message: "All data are required",
                });
                return;
            }
            // Cretae Car
            const car = await carService.create({
                name: req.body.name,
                plate: req.body.plate,
                price: req.body.price,
                capacity: req.body.capacity,
                image: req.file.filename,
                description: req.body.description,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const operations = await operationsService.create({
                idcar: car.id,
                iduser: req.user.id,
                createdBy: req.user.id,
                updatedBy: null,
                deletedBy: null,
            });
            const user = await userService.find(operations.iduser);
            const userInfo = {
                id: user.id,
                email: user.email,
            };
            const roles = await typeusers.findAll();
            const data = {
                car,
                operations,
                userInfo,
                roles,
            };
            res.status(201).json({
                status: "Car Created Successfully",
                data: data,
            });
        } catch (error) {
            res.status(422).json({
                status: "FAIL",
                message: error.message,
            });
        }
    },

    async update(req, res) {
        try {
            const car = await carService.get(req.params.id);
            if (!car) {
                res.status(404).json({
                    status: "FAIL",
                    message: "Car not found",
                });
                return
            }
            const imgLength = Object.keys(car.image).length
            if(imgLength > 1) {
                fs.unlinkSync(path.join(__dirname, "../../../public/img",car.image));
            }
            await carService.update(req.params.id, req.body);
            await operationsService.update(req.params.id, {
                updatedBy: req.user.id,
                updatedAt: new Date(),
            });
            console.log(req.params.id);
            console.log(req.user.id);
            // Get user info
            const user = await userService.find(req.user.id);
            const userInfo = {
                id: user.id,
                email: user.email,
            };
            // Get car info
            const carUpdated = await carService.get(req.params.id);
            const roles = await typeusers.findAll();
            const data = {
                car: carUpdated,
                userInfo,
                roles,
            };
            // Get operations info
            res.status(200).json({
                status: "OK",
                message: "Car Updated successfully",
                data: data,
            });
        } catch (error) {
            res.status(422).json({
                status: "FAIL",
                message: error.message,
            });
        }
    },

    async destroy(req, res) {
        try {
            const car = await carService.get(req.params.id);
            if (!car) {
                res.status(404).json({
                    status: "FAIL",
                    message: "Car not found",
                });
                return;
            }
            const imgLength = Object.keys(car.image).length
            if(imgLength > 1) {
                fs.unlinkSync(path.join(__dirname, "../../../public/img",car.image));
            }
            await carService.delete(req.params.id);
            await operationsService.update(req.params.id, {
                deletedBy: req.user.id,
                updatedAt: new Date(),
            });
            res.status(200).json({
                status: "OK",
                message: "Car has been deleted successfully",
            });
        } catch (error) {
            res.status(422).json({
                status: "FAIL",
                message: error.message,
            });
        }
    },
};