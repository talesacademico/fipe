
import { dataBransConsultContext, ListRefYearMonthContextProvider } from "../../context/FipeContext"
import { Forms } from "./components/Forms"

export const Context = () => {
    return (
        <ListRefYearMonthContextProvider>
            <dataBransConsultContext.Provider value={[]}>
                <Forms />
            </dataBransConsultContext.Provider>
        </ListRefYearMonthContextProvider>

    )
}