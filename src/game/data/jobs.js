import {STR, VIT, DEX, AGI, INT, MND, CHR, HP_MAX, MP_MAX} from 'game/stats'
export const WAR = "WAR";
export const THF = "THF";
export const BLM = "BLM";

export default {
    [WAR]: {
        gains: {
            [HP_MAX]: 10,
            [MP_MAX]: 0,
            [STR]: 1.6,
            [VIT]: 1.4,
            [DEX]: 0.9,
            [AGI]: 0.75,
            [INT]: 0.45,
            [MND]: 0.55,
            [CHR]: 0.63
        },
        skills: []
    },
    [THF]: {
        gains: {
            [HP_MAX]: 7.2,
            [MP_MAX]: 0,
            [STR]: 1.18,
            [VIT]: 1.1,
            [DEX]: 1.75,
            [AGI]: 1.65,
            [INT]: 0.75,
            [MND]: 0.6,
            [CHR]: 0.85
        },
        skills: []
    },
    [BLM]: {
        gains: {
            [HP_MAX]: 5.6,
            [MP_MAX]: 5,
            [STR]: 0.42,
            [VIT]: 0.7,
            [DEX]: 0.8,
            [AGI]: 0.73,
            [INT]: 1.7,
            [MND]: 1.2,
            [CHR]: 1.1
        },
        skills: []
    },
}
