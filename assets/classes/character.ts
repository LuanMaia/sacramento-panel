import { Attributes } from "./attributes";
import { BattleInventory } from "./battle-inventory";
import { Characteristic } from "./characteristic";
import { Endurances } from "./endurances";
import { Expertises } from "./expertises";

export class Character {
    attributes?: Attributes;
    expertises?: Expertises;
    endurances?: Endurances;
    battleInventory?: BattleInventory;
    characteristics?: Characteristic[];
    name?: String;
    player?: String;
    description?: String;
    exp?: Number;
    life?: Number;
    maxLife?: Number;
    public?: boolean;
    uuid!: string;
}