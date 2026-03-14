import { Joi, Segments } from "celebrate";
import { isValidObjectId } from 'mongoose';
import { TAGS } from "../contacts/tags.js";

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1),
    perPage: Joi.number().min(5).max(20),
    tag: Joi.string().valid(...TAGS).optional(),
    saerch: Joi.string(),
  })
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};


export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow("").optional(),
    tag: Joi.string().valid(...TAGS).optional(),
  })
};

export const updateNoteSchema = {
  ...noteIdSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).optional(),
    content: Joi.string().allow("").optional(),
    tag: Joi.string().valid(...TAGS).optional(),
  }).min(1)
};
