/*
    Copyright (c) 2015 Bugtori Shonen
    This software is released under the MIT License, see LICENSE.
*/
/// <reference path="SanmokuSim.ts" />

import SanmokuSim = require("SanmokuSim");
import AIFactory = require("AIFactory");

//ゲーム木に基づくAI
export class AITree implements AIFactory.IAI {
    constructor(private ssim: SanmokuSim.SanmokuSim) {
    }

    //次の手を考える
    public GetPos(): number {
        var myturn = this.ssim.turn;
        var tv = this.getTreeValue(this.ssim, myturn);
        return tv.pos;
    }

    //与えられた盤面状態から終局までシミュレートし、minimax法により評価値とその着手位置を得る。
    private getTreeValue(root_ssim: SanmokuSim.SanmokuSim, myturn: number): { val: number; pos: number } {
        //今が葉なら評価値をそのまま返す
        var leaf_value = this.evalFunc(myturn, root_ssim.Win());
        if (leaf_value != null) {
            return { val: leaf_value, pos: null };
        }

        //可能な着手について、葉の値を再帰的に求める。
        var rec_leaf_values: { val: number; pos: number }[] = Array();
        for (var i = 0; i < root_ssim.stones.length; i++) {
            if (root_ssim.stones[i] == -1) {
                //着手可能
                var copy_ssim = root_ssim.DeepCopy();
                copy_ssim.PutStone(i);
                var treevalue = this.getTreeValue(copy_ssim, myturn);
                treevalue.pos = i;
                rec_leaf_values.push(treevalue);
            }
        }
        
        //自分の手番なら最大値、相手なら最小値となる手を選択。
        var is_myturn = root_ssim.turn == myturn;
        var best_choice = rec_leaf_values[0];
        for (var i = 1; i < rec_leaf_values.length; i++) {
            if (is_myturn) {
                if (best_choice.val < rec_leaf_values[i].val) {
                    best_choice = rec_leaf_values[i];
                }
            } else {
                if (best_choice.val > rec_leaf_values[i].val) {
                    best_choice = rec_leaf_values[i];
                }
            }
        }

        return best_choice;
    }

    private evalFunc(myturn: number, win: number): number {
        if (win == null) {
            return null;
        }

        if (win == -1) {
            //引き分け
            return 0;
        }

        if (win == myturn) {
            //勝ち
            return 1;
        }

        //負け
        return -1;
    }
}
  