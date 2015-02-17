/*
    Copyright (c) 2015 Bugtori Shonen
    This software is released under the MIT License, see LICENSE.
*/
/// <reference path="SanmokuSim.ts" />

import SanmokuSim = require("SanmokuSim");
import AIFactory = require("AIFactory");

//ランダムな手を打つAI
export class AIRandom implements AIFactory.IAI {
    constructor(private ssim: SanmokuSim.SanmokuSim) {
    }

    //次の手を考える
    public GetPos():number {
        var possible_poss = Array();
        for (var i = 0; i < this.ssim.stones.length; i++) {
            if (this.ssim.stones[i] == -1) {
                possible_poss.push(i);
            }
        }

        return possible_poss[Math.floor(possible_poss.length * Math.random())];
    }
}
 