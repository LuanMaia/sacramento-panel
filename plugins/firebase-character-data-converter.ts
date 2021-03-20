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
        $convertFirebaseCharacterData(firebaseCharacter: FirebaseCharacter): Character,
        $convertEnduranceEndurancesToFirebase(endurances: Endurances): FirebaseEndurances,
        $convertBattleInventoryToFirebase(battleInventory: BattleInventory): FirebaseBattleInventory,
        $firebaseArrayFromArrayOf<T extends ArrayElement>(array?: T[]): { [id: string]: T } | null,
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

Vue.prototype.$convertEnduranceEndurancesToFirebase = (endurances: Endurances): FirebaseEndurances => {
    return {
        physical: convertEnduranceDiceBonusToFirebase(endurances.physical),
        mental: convertEnduranceDiceBonusToFirebase(endurances.mental),
        social: convertEnduranceDiceBonusToFirebase(endurances.social)
    };
}

Vue.prototype.$convertBattleInventoryToFirebase = (battleInventory: BattleInventory): FirebaseBattleInventory => {
    return {
        armors: firebaseArrayFromArrayOf(battleInventory.armors),
        weapons: firebaseArrayFromArrayOf(battleInventory.weapons)
    };
}

Vue.prototype.$firebaseArrayFromArrayOf = <T extends ArrayElement>(array?: T[]): { [id: string]: T } | null => firebaseArrayFromArrayOf(array)

function firebaseArrayToArrayOf<T extends ArrayElement>(firebaseArray?: { [id: string]: T } | null): T[] {
    if (!firebaseArray) {
        return [];
    } else {
        return Object.entries(firebaseArray).map(entry => {
            const element = entry[1];
            element.uuid = entry[0];

            return element;
        });
    }
}

function firebaseArrayFromArrayOf<T extends ArrayElement>(array?: T[]): { [id: string]: T } | null {
    if (!array || array.length === 0) {
        return null;
    } else {
        const firebaseArray: { [id: string]: any } = {};
        array.forEach(element => {
            firebaseArray[element.uuid] = element;
            firebaseArray[element.uuid]['uuid'] = null;
        });

        return firebaseArray;
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

function convertFirebaseEnduranceDiceBonus(firebaseEnduranceDiceBonus: FirebaseEnduranceDiceBonus | null): EnduranceDiceBonus {
    const enduranceDiceBonus = new EnduranceDiceBonus();

    if (!firebaseEnduranceDiceBonus || !firebaseEnduranceDiceBonus.attribute) {
        return enduranceDiceBonus;
    } else {
        enduranceDiceBonus.attribute = EnduranceAttributeType[firebaseEnduranceDiceBonus.attribute];
        enduranceDiceBonus.dice = firebaseEnduranceDiceBonus.dice;

        return enduranceDiceBonus;
    }
}

function convertEnduranceDiceBonusToFirebase(enduranceDiceBonus?: EnduranceDiceBonus): FirebaseEnduranceDiceBonus | null {
    if (!enduranceDiceBonus || !enduranceDiceBonus.attribute || !enduranceDiceBonus.dice) {
        return null;
    } else {
        return {
            dice: enduranceDiceBonus?.dice,
            attribute: getEnumKeyByEnumValue(EnduranceAttributeType, enduranceDiceBonus.attribute)
        };
    }
}

function getEnumKeyByEnumValue<T extends { [index: string]: string }>(myEnum: T, enumValue: string): keyof T | undefined {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : undefined;
}

interface FirebaseCharacter {
    attributes?: Attributes;
    expertises?: Expertises;
    endurances?: FirebaseEndurances;
    battleInventory?: FirebaseBattleInventory;
    characteristics?: { [id: string]: Characteristic };
    name?: String;
    player?: String;
    description?: String;
    exp?: Number;
    life?: Number;
    maxLife?: Number;
}

interface FirebaseBattleInventory {
    weapons: { [id: string]: BattleItem } | null;
    armors: { [id: string]: BattleItem } | null;
}

interface FirebaseEndurances {
    physical: FirebaseEnduranceDiceBonus | null;
    mental: FirebaseEnduranceDiceBonus | null;
    social: FirebaseEnduranceDiceBonus | null;
}

interface FirebaseEnduranceDiceBonus {
    attribute?: 'STRENGTH' | 'WIT' | 'CHARISMA';
    dice?: DiceType;
}

interface ArrayElement {
    uuid: string
}