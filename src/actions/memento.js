import { potatoExplotingSequence } from "./gammaExploring";


class ActionRecorder {
    constructor(trueActionSequence) {
        this.trueActionSequence = trueActionSequence;
        this.actionSequence = [];
    }

    addAction(action) {
        this.actionSequence.push(action); 
    }

    checkSequence() {
        let trueStepsCounter = 0;
        for (let userStep in this.actionSequence) {
            let priority = this._getFromTrueSequenceByName(this.actionSequence[userStep]).priorityStep;
            if (priority === parseInt(userStep, 10) + 1) {
                trueStepsCounter++;
            }
        }
        return [trueStepsCounter, this.trueActionSequence.length === trueStepsCounter];
    }

    clearActions() {
        this.actionSequence = [];
    }

    _getFromTrueSequenceByName(action) {
        let trueAction = null;
        for (let value of this.trueActionSequence) {
            if (value.action === action) {
                trueAction = value;
                break;
            }
        }
        return trueAction;
    }
}
export var recorder = new ActionRecorder(potatoExplotingSequence)
export default recorder;
