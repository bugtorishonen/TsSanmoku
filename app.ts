/// <reference path="jquery.d.ts" />

import SanmokuSim = require("SanmokuSim");
var ssim: SanmokuSim.SanmokuSim;
$(function () {
    ssim = new SanmokuSim.SanmokuSim();

    for (var i = 0; i < 9; i++) {
        (function (ii) {
            $("#board" + ii).click(function () { PutStone(ii); });
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
