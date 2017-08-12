export const STR = "STR"
export const VIT = "VIT"
export const DEX = "DEX"
export const AGI = "AGI"
export const INT = "INT"
export const MND = "MND"
export const CHR = "CHR"

export const HP_MAX = "HP_MAX";
export const MP_MAX = "MP_MAX";
export const ATK = "ATK";
export const DEF = "DEF";
export const MATK = "MATK";
export const MDEF = "MDEF";
export const ACC = "ACC";
export const EVA = "EVA";

const {max, min, round, floor} = Math;


function applyMods(stat, raw, mods) {
    // filter mods relative to stat
    let statMods = mods.filter(mod => mod.stat === stat);
    // filter additive modifiers (es + 15 atk)
    let additiveMods = statMods.filter(mod => mod.additive === true)
    // filter multiplicative modifiers (es def * 1.2 -> 20% increase)
    let multiplicativeMods = statMods.filter(mod => mod.multiplicative === true)
    // apply the additive mods first
    let additiveModsApplied = raw + additiveMods.reduce((sum, mod) => sum + mod.addValue, 0)
    // force >= 0
    let boundedValue = max(0, additiveModsApplied)
    // multiply value by the total modifier reduced from the multiplicative modifier
    let allModsApplied = boundedValue * multiplicativeMods.reduce((mult, mod) => mult * mod.multValue, 1);
    let total = max(1, round(allModsApplied))
    return total;
}

const BASE = 5;
const rawStatFormulae = {
    base: (stat, actor) => {
        let {job:{gains}, level} = actor;
        return floor(BASE + gains[stat] * level)
    },
    [STR]: (actor, mods) => rawStatFormulae.base(STR, actor),
    [VIT]: (actor, mods) => rawStatFormulae.base(VIT, actor),
    [DEX]: (actor, mods) => rawStatFormulae.base(DEX, actor),
    [AGI]: (actor, mods) => rawStatFormulae.base(AGI, actor),
    [INT]: (actor, mods) => rawStatFormulae.base(INT, actor),
    [MND]: (actor, mods) => rawStatFormulae.base(MND, actor),
    [CHR]: (actor, mods) => rawStatFormulae.base(CHR, actor),
    [HP_MAX]: (actor, mods) => {
        let {job:{gains}, level} = actor;
        let vit = (calcStat(VIT, actor, mods))
        return floor(max(1, (vit + level) * gains[HP_MAX]))
    },
    [MP_MAX]: (actor, mods) => {
        let {job:{gains}, level} = actor;
        let mnd = (calcStat(MND, actor, mods))
        return floor(max(1, (mnd + level) * gains[MP_MAX]))
    },
    [ATK]: (actor, mods) => calcStat(STR, actor, mods) * 2.5,
    [DEF]: (actor, mods) => calcStat(VIT, actor, mods) * 2,
    [MATK]: (actor, mods) => calcStat(INT, actor, mods) * 2.5,
    [MDEF]: (actor, mods) => calcStat(MND, actor, mods) * 3,
    [ACC]: (actor, mods) => calcStat(DEX, actor, mods) * 2,
    [EVA]: (actor, mods) => calcStat(AGI, actor, mods) * 2
}

export const calcStat = (stat, actor, mods=[]) => {
    let raw = rawStatFormulae[stat](actor, mods);
    return applyMods(stat, raw, mods);
}
