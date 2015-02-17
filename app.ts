/*
    Copyright (c) 2015 Bugtori Shonen
    This software is released under the MIT License, see LICENSE.
*/

/// <reference path="jquery.d.ts" />

import SanmokuSim = require("SanmokuSim");
import AIFactory = require("AIFactory");

var ssim: SanmokuSim.SanmokuSim;
$(function () {
    ssim = new SanmokuSim.SanmokuSim();

    //盤面クリックにより石を置くイベント
    for (var i = 0; i < 9; i++) {
        (function (ii) {
            $("#board" + ii).click(function () { PutStone(ii); });
        })(i);
    }

    //AIにより石を置くボタン
    var ai_name_list = AIFactory.AIFactory.GetList();
    for (var i = 0; i < ai_name_list.length; i++) {
        (function (ii) {
            var btn = $("<button type=\"button\" />").click(function () {
                var ai = AIFactory.AIFactory.Create(ai_name_list[ii], ssim);
                var aipos = ai.GetPos();
                ssim.PutStone(aipos);
                RenderBoard();
            }).text(ai_name_list[ii]);
            $("#ailist").append(btn);
        })(i);
    }

    RenderBoard();
});

function PutStone(pos: number) {
    if (ssim.CanPutStone(pos)) {
        ssim.PutStone(pos);
        RenderBoard();
    }
}

function RenderBoard() {
    for (var i = 0; i < 9; i++) {
        var stonestring = "&nbsp;";
        switch (ssim.stones[i]) {
            case 0:
                stonestring = "○";
                break;
            case 1:
                stonestring = "×";
                break;
        }

        $("#board" + i).html(stonestring);
    }

    var turnmsg = "";
    switch (ssim.turn) {
        case 0:
            turnmsg = "○'s turn";
            break;
        case 1:
            turnmsg = "×'s turn";
            break;
    }

    var win = ssim.Win();
    var winmsg = "";
    switch (win) {
        case 0:
            winmsg = "○ wins";
            break;
        case 1:
            winmsg = "× wins";
            break;
        case -1:
            winmsg = "Draw";
            break;
    }
    $("#boardmsg").text(winmsg || turnmsg);
}
