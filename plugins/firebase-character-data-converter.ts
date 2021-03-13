import Vue from 'vue'
import { Character } from '@/assets/classes/character'
import { Attributes } from '@/assets/classes/attributes';
import { Expertises } from '@/assets/classes/expertises';
import { Endurances } from '@/assets/classes/endurances';
import { BattleItem } from '@/assets/classes/battle-item';
import { Characteristic } from '@/assets/classes/characteristic';
import { BattleInventory } from '@/assets/classes/battle-inventory';

declare module 'vue/types/vue' {
    interface Vue {
        $convertFirebaseCharacterData(firebaseCharacter: FirebaseCharacter): Character
    }
}

Vue.prototype.$convertFirebaseCharacterData = (firebaseCharacter: FirebaseCharacter) => {
    const character = new Character();

    character.attributes = firebaseCharacter.attributes;
    character.expertises = firebaseCharacter.expertises;
    character.endurances = firebaseCharacter.endurances;
    character.name = firebaseCharacter.name;
    character.player = firebaseCharacter.player;
    character.description = firebaseCharacter.description;
    character.exp = firebaseCharacter.exp;
    character.life = firebaseCharacter.life;

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

class FirebaseCharacter {
    attributes?: Attributes;
    expertises?: Expertises;
    endurances?: Endurances;
    battleInventory?: FirebaseBattleInventory;
    characteristics?: { String: Characteristic };
    name?: String;
    player?: String;
    description?: String;
    exp?: Number;
    life?: Number;
}

class FirebaseBattleInventory {
    weapons?: { String: BattleItem };
    armors?: { String: BattleItem };
}