
import SanmokuSim = require("SanmokuSim");
import AIRandom = require("AIRandom");

export class AIFactory {
    public static Create(ai_name: string, ssim: SanmokuSim.SanmokuSim): IAI {
        switch (ai_name) {
            case "AIRandom":
                return new AIRandom.AIRandom(ssim);
        }
    }

    public static GetList(): string[]{
        return ["AIRandom"];
    }
}

export interface IAI {
    GetPos: { (): number };
}
