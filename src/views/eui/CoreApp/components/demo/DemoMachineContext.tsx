import { ActorRefFrom, createActor } from "xstate"
import { createContext } from "react"
import { demoMachine } from "./demoMachine"
import { createActorContext } from "@xstate/react"


export const DemoMachineContext = createActorContext(demoMachine, {
    inspect: (inpectionEvent) => {
        console.log(inpectionEvent)
    },
    id: demoMachine.id || "test"
})

export const DemoMachineProvider = ({ children }: any) => {
    return <DemoMachineContext.Provider>{children}</DemoMachineContext.Provider>
}
