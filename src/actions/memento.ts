import { Exploring, Stage, Action } from "./common.ts";


export class ActionRecorder {
    trueActionSequence: Exploring;
    actionSequence: Exploring;

    constructor(trueActionSequence: Exploring) {
        this.trueActionSequence = trueActionSequence;
        this.actionSequence = this._clear_actions(trueActionSequence);

        console.log(this.trueActionSequence, "real")
        console.log(this.actionSequence, "empty")
    }

    getScore(): number {
        let score : number = 0;
        for (let i = 0; i < this.actionSequence.stages.length; i++) {
           score += this.actionSequence.stages[i].actions.totalPoints * this.actionSequence.stages[i].coef;
        }
        console.log(score);
        
        return score / this.trueActionSequence.totalPoints
    }

    add_action(actionName: string) {
        let [stage, action] = this._getActionInfoByActionName(actionName);
        console.log(stage, action)
        this.actionSequence.stages[stage].actions.order.push(action);
    }

    cancel_action(actionName: string) {
        let  [stage, action] = this._getActionInfoByActionName(actionName);
        this.actionSequence.stages[stage].actions.order.splice(this.actionSequence.stages[stage].actions.order.indexOf(action), 1);
        this.actionSequence.stages[stage].coef -= action.penaltyForCanceling;
    }

    _clear_actions(source: Exploring): Exploring {
        let res = JSON.parse(JSON.stringify(source));

        for (let i = 0; i < res.stages.length; i++) {
            res.stages[i].actions.order = []
        }

        return res
    }

    _getActionInfoByActionName(actionName: string): [number, Action] {
        const [i, j] = this._findActionIndex(actionName);
        if (i === -1) {
            return [-1, { name: "", penaltyForCanceling: -1 }];
        }
        return [i, this.trueActionSequence.stages[i].actions.order[j]];
    }
    
    _findActionIndex(actionName: string): [number, number] {
        for (let i = 0; i < this.trueActionSequence.stages.length; i++) {
            const actions = this.trueActionSequence.stages[i].actions.order;
            const j = actions.findIndex(action => action.name === actionName);
            if (j !== -1) {
                return [i, j];
            }
        }
        return [-1, -1];
    }

    _setStageCoef() {
        for (let i = 0; i < this.trueActionSequence.stages.length; i++) {
            if (!this._checkStageSequence(this.actionSequence.stages[i])) {
                this.actionSequence.stages[i].coef -= this.trueActionSequence.stages[i].penalty
            }
        }
    }

    _checkStageSequence(stage : Stage): boolean {
        for (let i = 0; i < stage.actions.order.length; i++) {
            if (this.trueActionSequence.stages[i].actions.order[i].name !== stage.actions.order[i].name) {
                return false;
            }
        }
        return true
    }
}


