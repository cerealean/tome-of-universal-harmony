export class Item {
    name: string;
    type: ItemTypes;
    magic: number;
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
