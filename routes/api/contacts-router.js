import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import {
  isEmptyBody,
  isValidId,
  isEmptyFavorite,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteSchema,
} from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:id", isValidId, contactsController.getContactById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.addContact
);

contactsRouter.delete("/:id", isValidId, contactsController.removeContact);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateById
);
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyFavorite,
  validateBody(contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
