import { Exploring} from "./common.ts";
import { ActionRecorder } from "./memento.ts";

export enum PotatoExploringActions {
    ENABLE_PC = "enable_pc",
    ENABLE_PROGRAM = "enable_program",
    WAIT_FOR_PC = "wait_for_pc",
}

const potatoExploringSequence: Exploring = {
    totalPoints: 100,
    stages: [
        {
            coef: 1,
            penalty: 0,
            actions: {
                totalPoints: 20,
                order: [
                    {
                        name: PotatoExploringActions.ENABLE_PC,
                        penaltyForCanceling: 0,
                    },
                    {  
                        name: PotatoExploringActions.ENABLE_PROGRAM,
                        penaltyForCanceling: 0,
                    },
                    {
                        name: PotatoExploringActions.WAIT_FOR_PC,
                        penaltyForCanceling: 0,
                    }
                ],
            }
        }
    ]
}

const GammaExploring = new ActionRecorder(potatoExploringSequence);
export default  GammaExploring
