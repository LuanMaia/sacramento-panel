import Vue from 'vue'
import { Character } from '@/assets/classes/character'
import { Attributes } from '@/assets/classes/attributes';
import { Expertises } from '@/assets/classes/expertises';
import { Endurances } from '@/assets/classes/endurances';
import { BattleItem } from '@/assets/classes/battle-item';
import { Characteristic } from '@/assets/classes/characteristic';
import { BattleInventory } from '@/assets/classes/battle-inventory';
import { DiceType } from '@/assets/classes/dice-type';
import { EnduranceDiceBonus } from '@/assets/classes/endurance-dice-bonus';
import { EnduranceAttributeType } from '@/assets/classes/endurance-attribute-type';

declare module 'vue/types/vue' {
    interface Vue {
        $convertFirebaseCharacterData(firebaseCharacter: FirebaseCharacter): Character
    }
}

Vue.prototype.$convertFirebaseCharacterData = (firebaseCharacter: FirebaseCharacter) => {
    const character = new Character();

    character.attributes = firebaseCharacter.attributes;
    character.expertises = firebaseCharacter.expertises;
    character.endurances = convertFirebaseEndurances(firebaseCharacter.endurances);
    character.name = firebaseCharacter.name;
    character.player = firebaseCharacter.player;
    character.description = firebaseCharacter.description;
    character.exp = firebaseCharacter.exp;
    character.life = firebaseCharacter.life;
    character.maxLife = firebaseCharacter.maxLife;

    character.characteristics = firebaseArrayToArrayOf<Characteristic>(firebaseCharacter.characteristics);

    character.battleInventory = new BattleInventory();
    character.battleInventory.armors = firebaseArrayToArrayOf<BattleItem>(firebaseCharacter.battleInventory?.armors);
    character.battleInventory.weapons = firebaseArrayToArrayOf<BattleItem>(firebaseCharacter.battleInventory?.weapons);

    return character;
}

function firebaseArrayToArrayOf<T>(firebaseArray: { String: T } | undefined): Array<T> {
    if (!firebaseArray) {
        return [];
    } else {
        return Object.values<T>(firebaseArray);
    }
}

function convertFirebaseEndurances(firebaseEndurances: FirebaseEndurances | undefined): Endurances {
    const endurances = new Endurances();

    endurances.mental = new EnduranceDiceBonus();
    endurances.physical = new EnduranceDiceBonus();
    endurances.social = new EnduranceDiceBonus();

    if (!firebaseEndurances) {
        return endurances;
    }

    endurances.mental = convertFirebaseEnduranceDiceBonus(firebaseEndurances.mental);
    endurances.physical = convertFirebaseEnduranceDiceBonus(firebaseEndurances.physical);
    endurances.social = convertFirebaseEnduranceDiceBonus(firebaseEndurances.social);

    return endurances;
}

function convertFirebaseEnduranceDiceBonus(firebaseEnduranceDiceBonus: FirebaseEnduranceDiceBonus | undefined): EnduranceDiceBonus {
    const enduranceDiceBonus = new EnduranceDiceBonus();

    if (!firebaseEnduranceDiceBonus || !firebaseEnduranceDiceBonus.attribute) {
        return enduranceDiceBonus;
    } else {
        enduranceDiceBonus.attribute = EnduranceAttributeType[firebaseEnduranceDiceBonus.attribute];
        enduranceDiceBonus.dice = firebaseEnduranceDiceBonus.dice;

        return enduranceDiceBonus;
    }
}

class FirebaseCharacter {
    attributes?: Attributes;
    expertises?: Expertises;
    endurances?: FirebaseEndurances;
    battleInventory?: FirebaseBattleInventory;
    characteristics?: { String: Characteristic };
    name?: String;
    player?: String;
    description?: String;
    exp?: Number;
    life?: Number;
    maxLife?: Number;
}

class FirebaseBattleInventory {
    weapons?: { String: BattleItem };
    armors?: { String: BattleItem };
}

class FirebaseEndurances {
    physical?: FirebaseEnduranceDiceBonus;
    mental?: FirebaseEnduranceDiceBonus;
    social?: FirebaseEnduranceDiceBonus;
}

class FirebaseEnduranceDiceBonus {
    attribute?: 'STRENGTH' | 'WIT' | 'CHARISMA';
    dice?: DiceType;
}