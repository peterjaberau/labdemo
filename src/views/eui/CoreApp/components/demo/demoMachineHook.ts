import { DemoMachineContext } from "./DemoMachineContext"

export const useDemoMachine: any = () => {

    const actor = DemoMachineContext.useActorRef();
    const state = DemoMachineContext.useSelector((state: any) => state);

    return {
        actor: actor,
        state: state,
    }
}
