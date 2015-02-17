/*
    Copyright (c) 2015 Bugtori Shonen
    This software is released under the MIT License, see LICENSE.
*/
/// <reference path="jquery.d.ts" />
define(["require", "exports"], function (require, exports) {
    var SanmokuSim = (function () {
        function SanmokuSim() {
            this.stones = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
            this.turn = 0;
        }
        SanmokuSim.prototype.DeepCopy = function () {
            var ssim = new SanmokuSim();
            ssim.stones = this.stones.concat();
            ssim.turn = this.turn;
            return ssim;
        };
        SanmokuSim.prototype.PutStone = function (pos, stone) {
            var stonenotspecified = stone == null;
            if (stonenotspecified) {
                stone = this.turn;
            }
            this.stones[pos] = stone;
            if (stonenotspecified) {
                //手番を反転する。
                this.turn = 1 - this.turn;
            }
        };
        SanmokuSim.prototype.CanPutStone = function (pos) {
            return this.stones[pos] == -1;
        };
        // 勝敗を判定。null=未決着、0=○、1=×、-1=引き分け
        SanmokuSim.prototype.Win = function () {
            var allsame = function (a, idxs) {
                var samenum = a[idxs[0]];
                for (var i = 1; i < idxs.length; i++) {
                    if (a[idxs[i]] != samenum) {
                        return null;
                    }
                }
                return samenum;
            };
            var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; //隣接3要素
            for (var i = 0; i < lines.length; i++) {
                var samenum = allsame(this.stones, lines[i]);
                if ((samenum == 0) || (samenum == 1)) {
                    //勝敗決定
                    return samenum;
                }
            }
            for (var i = 0; i < 9; i++) {
                if (this.stones[i] == -1) {
                    //埋まっていない場所があるので、未決着
                    return null;
                }
            }
            //全て埋まっていてどちらも列を構成しないので、引き分け
            return -1;
        };
        return SanmokuSim;
    })();
    exports.SanmokuSim = SanmokuSim;
});
//# sourceMappingURL=SanmokuSim.js.map