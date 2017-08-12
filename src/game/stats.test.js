import {
    STR, VIT, DEX, AGI, INT, MND, CHR, HP_MAX, MP_MAX,
    calcStat
} from './stats';

let testJob = {
    gains: {
        [HP_MAX]: 10,
        [MP_MAX]: 5,
        [STR]: 2,
        [VIT]: 2,
        [DEX]: 0.5,
        [AGI]: 0.5,
        [INT]: 1,
        [MND]: 1,
        [CHR]: 0.35
    }
}

let zerk = {
    stat: STR,
    multiplicative: true,
    multValue: 1.2
}

let enrage = {
    stat: STR,
    multiplicative: true,
    multValue: 1.5
}

let protect = {
    stat: VIT,
    additive: true,
    addValue: 10
}

let guard = {
    stat: VIT,
    additive: true,
    addValue: 15
}

let mndBoost = {
    stat: MND,
    additive: true,
    addValue: 5,
    multiplicative: true,
    multValue: 1.1
}

let enlightenment = {
    stat: MND,
    additive: true,
    addValue: 10,
    multiplicative: true,
    multValue: 1.2
}

let immobilize = {
    stat: AGI,
    additive: true,
    addValue: -100
}

let brinkOfDeath = {
    stat: HP_MAX,
    multiplicative: true,
    multValue: 0
}
describe('calcStat', () => {
    it('calculates correctly the base stats', () => {
        let actor = {job: testJob, level: 20}
        expect(calcStat(HP_MAX, actor))
        .toBe(650)
        expect(calcStat(MP_MAX, actor))
        .toBe(225)
        expect(calcStat(STR, actor))
        .toBe(45) // 5 base + 20 * 2
        expect(calcStat(VIT, actor))
        .toBe(45) // 5 base + 20 * 2
        expect(calcStat(DEX, actor))
        .toBe(15) // 5 base + 20 * 0.5
        expect(calcStat(AGI, actor))
        .toBe(15) // 5 base + 20 * 0.5
        expect(calcStat(INT, actor))
        .toBe(25) // 5 base + 20 * 1
        expect(calcStat(MND, actor))
        .toBe(25) // 5 base + 20 * 1
        expect(calcStat(CHR, actor))
        .toBe(12) // 5 base + 20 * 0.35
    })
    it('rounds down the base values', () => {
        let actor = {job: testJob, level: 3}
        expect(calcStat(STR, actor))
        .toBe(11) // 5 base + 3 * 2
        expect(calcStat(DEX, actor))
        .toBe(6) // 5 base + 3 * 0.5 (rounded down)
        expect(calcStat(CHR, actor))
        .toBe(6) // 5 base + 3 * 0.35 (rounded down)
    })
    it('applies the additive mods correctly', () => {
        let actor = {job: testJob, level: 20}
        let mods = [protect]
        expect(calcStat(VIT, actor, mods))
        .toBe(55) // 5 base + 20 * 2 + 10 (protect)
        mods = [protect, guard]
        expect(calcStat(VIT, actor, mods))
        .toBe(70) // 5 base + 20 * 2 + 10 (protect) + 15 (guard)
    })
    it('applies the multiplicative mods correctly', () => {
        let actor = {job: testJob, level: 20}
        let mods = [zerk]
        expect(calcStat(STR, actor, mods))
        .toBe(54) // (5 base + 20 * 2 ) * 1.2 (zerk)
        mods = [zerk, enrage]
        expect(calcStat(STR, actor, mods))
        .toBe(81) // (5 base + 20 * 2 ) * 1.3 (enrage) * 1.5 (zerk)
    })
    it('applies mixed mods correctly', () => {
        let actor = {job: testJob, level: 30}
        let mods = [mndBoost]
        expect(calcStat(MND, actor, mods))
        .toBe(44) // (5 base + 30 * 1 + 5 (mndBoost)) * 1.1 (mndBoost)
        mods = [mndBoost, enlightenment]
        expect(calcStat(MND, actor, mods))
        .toBe(66) // (5 base + 30 * 1 + 5 (mndBoost) + 10 (enlightenment)) * 1.1 (mndBoost) * 1.2 (enlightenment)
    })
    it('bounds most stat at >= 1', () => {
        let actor = {job: testJob, level: 10}
        let mods = [immobilize]
        expect(calcStat(AGI, actor, mods))
        .toBe(1) // 5 base + 10 * 0.5 - 100 (immobilize) (caps at 1)

        mods = [brinkOfDeath]
        expect(calcStat(HP_MAX, actor, mods))
        .toBe(1) // (caps at 1)

    })
    it('handles multiple unrelated mods correctly', () => {
        let actor = {job: testJob, level: 20}
        let mods = [protect, guard, zerk, enrage, mndBoost, enlightenment, immobilize]
        expect(calcStat(STR, actor, mods))
        .toBe(81) // (5 base + 20 * 2 ) * 1.3 (enrage) * 1.5 (zerk)
        expect(calcStat(VIT, actor, mods))
        .toBe(70) // 5 base + 20 * 2 + 10 (protect) + 15 (guard)
        expect(calcStat(DEX, actor, mods))
        .toBe(15) // 5 base + 20 * 0.5
        expect(calcStat(AGI, actor, mods))
        .toBe(1) // 5 base + 20 * 0.5 - 100 (immobilize) (caps at 1)
        expect(calcStat(INT, actor, mods))
        .toBe(25) // 5 base + 20 * 1
        expect(calcStat(MND, actor, mods))
        .toBe(53) // (5 base + 20 * 1 + 5 (mndBoost) + 10 (enlightenment)) * 1.1 (mndBoost) * 1.2 (enlightenment)
        expect(calcStat(CHR, actor, mods))
        .toBe(12) // 5 base + 20 * 0.35
    })
})
