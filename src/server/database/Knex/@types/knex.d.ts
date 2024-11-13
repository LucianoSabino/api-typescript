//  Isso significa que quando você usar cidade em suas queries Knex, o TypeScript saberá que ela tem a estrutura definida em ICidade.

import { Icidade } from "../../models";

declare module "knex/types/tables" {
    interface Tables {
        cidade: Icidade;
    }
}
