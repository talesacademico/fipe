import { useEffect, useState } from "react"
import { SelectComp } from "../../../components/select"
import { api } from "../../../services/axios"

export const SelectRef = ({refTable, type}) => {
    const [refs, setRefs] = useState([])
    useEffect(()=>{
        api.post('ConsultarMarcas', {
            codigoTabelaReferencia: refTable,
            codigoTipoVeiculo: type
        })
            .then(response => response.data)
            .then(data => {
                setRefs(data)
            })
    }, [refTable])
    return (
        <>
            <SelectComp options={refs} label={'Mês Referência'} />
        </>
    )
}