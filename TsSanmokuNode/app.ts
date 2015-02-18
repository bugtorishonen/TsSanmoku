console.log('Hello world');

import SanmokuSim = require("../SanmokuSim");
import AIFactory = require("../AIFactory");

function RenderBoard(ssim: SanmokuSim.SanmokuSim) {

    var stonestring = "";
    for (var i = 0; i < 9; i++) {
        switch (ssim.stones[i]) {
            case 0:
                stonestring += "○";
                break;
            case 1:
                stonestring += "×";
                break;
            default:
                stonestring += "　";
                break;
        }
        if (i % 3 == 2) {
            stonestring += "\n";
        }
    }
    console.log(stonestring);

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
    console.log(winmsg || turnmsg);
}

function main() {
    var ssim = new SanmokuSim.SanmokuSim();
    //AI同士の対戦を行う
    console.log(AIFactory.AIFactory.GetList());
    var ais_to_use = ["AIRandom", "AITree"];
    console.log("AIs: %s", ais_to_use);

    while (ssim.Win() == null) {
        var ai_to_use = ais_to_use[ssim.turn];
        var ai = AIFactory.AIFactory.Create(ai_to_use, ssim);
        ssim.PutStone(ai.GetPos());
        RenderBoard(ssim);
    }

    console.log("Finished");
}

main();
