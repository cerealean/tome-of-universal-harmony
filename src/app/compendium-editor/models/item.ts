export class Item {
    name: string;
    type: ItemTypes;
    private isMagic = false;
    get magic() {
        return Number(this.isMagic);
    }
    set magic(value: any) {
        this.isMagic = value && value != "0" && value != 0;
    }
    weight: number;
    value: number;
    detail: string;
    dmg1: string;
    dmg2: string;
    dmgType: DamageTypes;
    property: string;
    range: string;
    text: string[];
}

export enum ItemTypes {
    Ammunition = "A",
    AdventuringGear = "G",
    RangedWeapon = "R",
    MeleeWeapon = "M",
    WonderousItem = "W",
    HeavyArmor = "HA",
    LightArmor = "LA",
    MediumArmor = "MA",
    Currency = "$"
}

export enum DamageTypes {
    Slashing = "S",
    Piercing = "P",
    Bludgeoning = "B"
}
