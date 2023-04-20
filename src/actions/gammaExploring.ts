import { Exploring} from "./common.ts";
import { ActionRecorder } from "./memento.ts";

export enum PotatoExploringActions {
  ENABLE_PC = "enable_pc",
  ENABLE_PROGRAM = "enable_program",
  WAIT_FOR_WARMING_UP = "wait_for_warming_up",

  //CALIBRATION
  PICK_C_CONTAINER = "pick_c_container",
  PUT_C_CONTAINER_INTO_CASE = "put_c_container_into_case",
  CLOSE_CASE_WITH_C_CONTAINER = "close_case_with_c_container",
  ACTIVATE_CALIBRATION_POPUP = "activate_calibration_popup",
  STOP_TIMER_FOR_C_POPUP = "stop_timer_for_c_popup",

  //BACKGROUND
  REMOVE_C_CONTAINER = "remove_c_container",
  CLOSE_CASE_WITHOUT_CONTAINERS = "close_case_without_containers",
  ACTIVATE_BACKGROUND_POPUP = "activate_background_popup",
  STOP_TIMER_FOR_B_POPUP = "stop_timer_for_b_popup",

  //ACTIVITY
  PUT_POTATO_INTO_CONTAINER = "put_potato_into_container",
  PICK_O_CONTAINER = "pick_o_container",
  PUT_O_CONTAINER_INTO_CASE ="put_o_container_into_case",
  CLOSE_CASE_WITH_O_CONTAINER = "close_case_with_o_container",
  ACTIVATE_ACTIVITY_POPUP = "activate_activity_popup",
  STOP_TIMER_FOR_A_POPUP = "stop_timer_for_a_popup"
}

const potatoExploringSequence: Exploring = {
    totalPoints: 80,
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
                  name: PotatoExploringActions.WAIT_FOR_WARMING_UP,
                  penaltyForCanceling: 0,
                },
              ],
          }
      },
      {
        coef: 1,
        penalty: 0.7,
        actions: {
          totalPoints: 20,
          order: [
            {
              name: PotatoExploringActions.PICK_C_CONTAINER,
              penaltyForCanceling: 0.05,
            },
            {
              name: PotatoExploringActions.PUT_C_CONTAINER_INTO_CASE,
              penaltyForCanceling: 0,
            },
            {
              name: PotatoExploringActions.CLOSE_CASE_WITH_C_CONTAINER,
              penaltyForCanceling: 0,
            },
            {
              name: PotatoExploringActions.ACTIVATE_CALIBRATION_POPUP,
              penaltyForCanceling: 0,
            },
            {
              name: PotatoExploringActions.STOP_TIMER_FOR_C_POPUP,
              penaltyForCanceling: 0,
            },
          ],
        }
      },
      {
        coef: 1,
        penalty: 0.7,
        actions: {
          totalPoints: 20,
          order: [
            {
              name: PotatoExploringActions.REMOVE_C_CONTAINER,
              penaltyForCanceling: 0,
            },
            {
              name: PotatoExploringActions.CLOSE_CASE_WITHOUT_CONTAINERS,
              penaltyForCanceling: 0,
            },
            {
              name: PotatoExploringActions.ACTIVATE_BACKGROUND_POPUP,
              penaltyForCanceling: 0,
            },
            {
              name: PotatoExploringActions.STOP_TIMER_FOR_B_POPUP,
              penaltyForCanceling: 0,
            },
          ],
        }
      },
      {
        coef: 1,
        penalty: 0.7,
        actions: {
          totalPoints: 20,
          order: [
            {
              name: PotatoExploringActions.PUT_POTATO_INTO_CONTAINER,
              penaltyForCanceling: 0,
            },
            {
              name: PotatoExploringActions.PICK_O_CONTAINER,
              penaltyForCanceling: 0.05,
            },
            {
              name: PotatoExploringActions.PUT_O_CONTAINER_INTO_CASE,
              penaltyForCanceling: 0,
            },
            {
              name: PotatoExploringActions.CLOSE_CASE_WITH_O_CONTAINER,
              penaltyForCanceling: 0,
            },
            {
              name: PotatoExploringActions.ACTIVATE_ACTIVITY_POPUP,
              penaltyForCanceling: 0,
            },
            {
              name: PotatoExploringActions.STOP_TIMER_FOR_A_POPUP,
              penaltyForCanceling: 0,
            },
          ],
        }
      }
    ]
}

const GammaExploring = new ActionRecorder(potatoExploringSequence);
export default  GammaExploring
