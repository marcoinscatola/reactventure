const EFFECT_MOD = 'EFFECT_MOD';
const EQUIP_MOD = 'EQUIP_MOD';
const FOOD_MOD = 'FOOD_MOD';
const WEATHER_MOD = 'WEATHER_MOD';
export function makeEffectMod({name, stat, multValue=null, addValue=null}) {
    return {
        type: EFFECT_MOD,
        name,
        stat,
        multValue,
        multiplicative: multValue !== null ? true : false,
        addValue,
        additive: addValue !== null ? true : false
    }
}

export function makeEquipMod({name, stat, multValue=null, addValue=null, slot, isMain=false}) {
    return {
        type: EQUIP_MOD,
        name,
        stat,
        slot,
        isMain,
        multValue,
        multiplicative: multValue !== null ? true : false,
        addValue,
        additive: addValue !== null ? true : false
    }
}
