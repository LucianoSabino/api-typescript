// Facilita a exportação

import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./UpdateById";
import * as deleteById from "./Delete";

export const CidadeController = {
    ...create,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById,
};
