/*
    Copyright (c) 2015 Bugtori Shonen
    This software is released under the MIT License, see LICENSE.
*/
/// <reference path="SanmokuSim.ts" />
define(["require", "exports"], function (require, exports) {
    //ランダムな手を打つAI
    var AIRandom = (function () {
        function AIRandom(ssim) {
            this.ssim = ssim;
        }
        //次の手を考える
        AIRandom.prototype.GetPos = function () {
            var possible_poss = Array();
            for (var i = 0; i < this.ssim.stones.length; i++) {
                if (this.ssim.stones[i] == -1) {
                    possible_poss.push(i);
                }
            }
            return possible_poss[Math.floor(possible_poss.length * Math.random())];
        };
        return AIRandom;
    })();
    exports.AIRandom = AIRandom;
});
//# sourceMappingURL=AIRandom.js.map