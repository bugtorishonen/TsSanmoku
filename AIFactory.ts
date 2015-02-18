/*
    Copyright (c) 2015 Bugtori Shonen
    This software is released under the MIT License, see LICENSE.
*/

import SanmokuSim = require("./SanmokuSim");
import AIRandom = require("./AIRandom");
import AITree = require("./AITree");

export class AIFactory {
    public static Create(ai_name: string, ssim: SanmokuSim.SanmokuSim): IAI {
        switch (ai_name) {
            case "AIRandom":
                return new AIRandom.AIRandom(ssim);
            case "AITree":
                return new AITree.AITree(ssim);
        }
    }

    public static GetList(): string[] {
        return ["AIRandom", "AITree"];
    }
}

export interface IAI {
    GetPos: { (): number };
}
