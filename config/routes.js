const express = require("express");
const controllers = require("../app/controllers");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../OpenApi.json");

const apiRouter = express.Router();

const path = require("path");
const multer = require("multer");

// Upload image
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../app/public/img"))
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${file.originalname.toLowerCase().split(' ').join('-')}`;
        cb(null, fileName);
    }
})

let uploadImage = multer({
    storage: storage
});

const prefix = "/api/v1";

// Login users
apiRouter.post(prefix + "/login", controllers.api.v1.authController.login);
apiRouter.post(prefix + "/register", controllers.api.v1.authController.registrasi);

// Create Admin yang hanya dapat dilakukan oleh "Super Admin"
apiRouter.get(prefix + "/list-users", controllers.api.v1.authController.authorize(1), controllers.api.v1.userController.listAllUsers);
apiRouter.get(prefix + "/list-admin", controllers.api.v1.authController.authorize(1), controllers.api.v1.userController.listAdmin);
apiRouter.get(prefix + "/list-member", controllers.api.v1.authController.authorize(1, 2), controllers.api.v1.userController.listMember);
apiRouter.post(prefix + "/add-admin", controllers.api.v1.authController.authorize(1), controllers.api.v1.userController.createAdmin);

// whoAmI -> check current user
apiRouter.get(prefix + "/whoami", controllers.api.v1.authController.authorize(1, 2, 3), controllers.api.v1.authController.whoAmI);

// CRUD Cars, (Create, update, delete hanya dapat dilakukan oleh Super Admin dan Admin)
apiRouter.get(prefix + "/cars", controllers.api.v1.authController.authorize(1, 2, 3), controllers.api.v1.carController.list);
apiRouter.get(prefix + "/cars/:id", controllers.api.v1.authController.authorize(1, 2, 3), controllers.api.v1.carController.show);
apiRouter.post(prefix + "/cars", controllers.api.v1.authController.authorize(1, 2), uploadImage.single("image"), controllers.api.v1.carController.create);
apiRouter.put(prefix + "/cars/:id", controllers.api.v1.authController.authorize(1, 2), uploadImage.single("image"), controllers.api.v1.carController.update);
apiRouter.delete(prefix + "/cars/:id", controllers.api.v1.authController.authorize(1, 2), controllers.api.v1.carController.destroy);

// check data cars yang telah dihapus untuk melihat deletedBy
apiRouter.get(prefix + "/deleted-cars", controllers.api.v1.authController.authorize(1), controllers.api.v1.carController.showDeleted);

// Create Type user (roles) yang hanya dapat dilakukan oleh "Super Admin"
apiRouter.get(prefix + "/list-typeuser", controllers.api.v1.authController.authorize(1, 2), controllers.api.v1.userController.listAllRoles);

// Open API
apiRouter.get(prefix + "/docs/swagger.json", (req, res) => {
    res.status(200).json(swaggerDocument);
});
apiRouter.use(prefix + "/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;