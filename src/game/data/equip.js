import * as equip from 'game/equip';
import {makeEquipMod} from 'game/mods';
import * as stats from 'game/stats';
export default {
    SWORD: equip.define({
        name: 'SWORD',
        validSlot: equip.MAIN,
        mods: [
            makeEquipMod({
                name: 'SWORD',
                stat: stats.STR,
                addValue: 5,
                isMain: true
            })
        ]
    })
}
