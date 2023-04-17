export type Action = {
    name: string
    penaltyForCanceling: number
}

export interface StageActions {
    totalPoints: number
    order: Array<Action>
}

export interface Stage {
    coef : number
    penalty : number
    actions: StageActions
}

export interface Exploring {
    totalPoints: number
    stages: Array<Stage>
}



