/*
    Copyright (c) 2015 Bugtori Shonen
    This software is released under the MIT License, see LICENSE.
*/
define(["require", "exports", "AIRandom", "AITree"], function (require, exports, AIRandom, AITree) {
    var AIFactory = (function () {
        function AIFactory() {
        }
        AIFactory.Create = function (ai_name, ssim) {
            switch (ai_name) {
                case "AIRandom":
                    return new AIRandom.AIRandom(ssim);
                case "AITree":
                    return new AITree.AITree(ssim);
            }
        };
        AIFactory.GetList = function () {
            return ["AIRandom", "AITree"];
        };
        return AIFactory;
    })();
    exports.AIFactory = AIFactory;
});
//# sourceMappingURL=AIFactory.js.map