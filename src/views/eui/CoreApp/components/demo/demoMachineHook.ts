import { DemoMachineContext, DemoMachineCardContext } from "./DemoMachineContext"

export const useDemoMachine: any = () => {

    const actor = DemoMachineContext.useActorRef();
    const state = DemoMachineContext.useSelector((state: any) => state);

    return {
        actor: actor,
        state: state,
    }
}


export const useDemoMachineCard: any = () => {

    const actorCard = DemoMachineCardContext.useActorRef();
    const stateCard = DemoMachineCardContext.useSelector((state: any) => state);

    return {
        actorCard,
        stateCard,
    }
}
