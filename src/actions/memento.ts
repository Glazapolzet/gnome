import { Exploring, Stage, Action } from "./common";


export class ActionRecorder {
    trueActionSequence: Exploring;
    actionSequence: Exploring;
    isRecording: boolean;

    constructor(trueActionSequence: Exploring) {
        this.trueActionSequence = trueActionSequence;
        this.actionSequence = this._clear_actions(trueActionSequence);
        this.isRecording = true

        // console.log(this.trueActionSequence, "real")
        // console.log(this.actionSequence, "empty")
    }

    getScore(): number {
        if (this.isRecording) {
            this._setStageCoef();
            this.isRecording = false;
        }

        // console.log(this.actionSequence);
        
        let score : number = 0;
        for (let i = 0; i < this.actionSequence.stages.length; i++) {
           score += this.actionSequence.stages[i].actions.totalPoints * this.actionSequence.stages[i].coef;
        }
        // console.log(score);
        
        return Math.round(score)
    }

    getTotalAvailableScore(): number {
        return this.trueActionSequence.totalPoints
    }

    add_action_with_penalty(actionName: string, penalty: number) {
        let [stage, action] = this._getActionInfoByActionName(actionName);

        action.penalty = penalty;

        this.actionSequence.stages[stage].actions.order.push(action);
        console.log(this.actionSequence);
    }

    add_action(actionName: string) {
        let [stage, action] = this._getActionInfoByActionName(actionName);
        this.actionSequence.stages[stage].actions.order.push(action);
        console.log(this.actionSequence);
    }

    check_action_added(actionName: string): boolean {
        let [stage, action] = this._getActionInfoByActionName(actionName);
        return this.actionSequence.stages[stage].actions.order.indexOf(action) !== -1
    }

    cancel_action(actionName: string) {
        let  [stage, action] = this._getActionInfoByActionName(actionName);
        this.actionSequence.stages[stage].actions.order.splice(this.actionSequence.stages[stage].actions.order.indexOf(action), 1);
        this.actionSequence.stages[stage].coef -= action.penaltyForCanceling;

        console.log(this.actionSequence);
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
            if (this.actionSequence.stages[i].actions.order.length === 0) {
                this.actionSequence.stages[i].coef = 0;
                continue
            }

            if (!this._checkStageSequence(this.actionSequence.stages[i], this.trueActionSequence.stages[i])) {
                this.actionSequence.stages[i].coef -= this.trueActionSequence.stages[i].penalty
                continue
            }
            
            for (let j = 0; j < this.trueActionSequence.stages[i].actions.order.length; j++) {
                if (this.actionSequence.stages[i].actions.order[j].penalty !== undefined){
                    this.actionSequence.stages[i].coef -= this.trueActionSequence.stages[i].actions.order[j].penalty as number
                }
            }
        }
    }

    _checkStageSequence(stage : Stage, trueStage : Stage): boolean {
        if (stage.actions.order.length !== trueStage.actions.order.length) {
          return false
        }

        for (let i = 0; i < stage.actions.order.length; i++) {
            if (trueStage.actions.order[i].name !== stage.actions.order[i].name) {
                return false;
            }
        }
        return true
    }
}


