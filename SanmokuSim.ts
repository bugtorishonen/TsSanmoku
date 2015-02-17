/// <reference path="jquery.d.ts" />

export class SanmokuSim {
    public stones: number[];//各マスの石の状態。-1=なし、0=○、1=×、順序は左上、中上、右上、左中、…
    public turn: number;//どちらの手番か。0=○(先攻)、1=×(後攻)。

    constructor() {
        this.stones = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
        this.turn = 0;
    }

    public DeepCopy(): SanmokuSim {
        var ssim = new SanmokuSim();
        ssim.stones = this.stones.concat();
        ssim.turn = this.turn;
        return ssim;
    }

    public PutStone(pos: number, stone?: number) {
        var stonenotspecified = stone == null;
        if (stonenotspecified) {
            stone = this.turn;
        }
        this.stones[pos] = stone;
        if (stonenotspecified) {
            //手番を反転する。
            this.turn = 1 - this.turn;
        }
    }

    public CanPutStone(pos: number): boolean {
        return this.stones[pos] == -1;
    }

    // 勝敗を判定。null=未決着、0=○、1=×、-1=引き分け
    public Win(): number {
        var allsame = function (a: number[], idxs: number[]): number {
            var samenum = a[idxs[0]];
            for (var i = 1; i < idxs.length; i++) {
                if (a[idxs[i]] != samenum) {
                    return null;
                }
            }
            return samenum;
        }

        var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];//隣接3要素
        for (var i = 0; i < lines.length; i++) {
            var samenum = allsame(this.stones, lines[i]);
            if ((samenum == 0) || (samenum == 1)) {
                //勝敗決定
                return samenum;
            }
        }

        //引き分け判定
        for (var i = 0; i < 9; i++) {
            if (this.stones[i] == -1) {
                //埋まっていない場所があるので、未決着
                return null;
            }
        }

        //全て埋まっていてどちらも列を構成しないので、引き分け
        return -1;
    }
}
