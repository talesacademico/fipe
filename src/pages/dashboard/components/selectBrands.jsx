import { useEffect, useState } from "react"
import { SelectComp } from "../../../components/select"
import { api } from "../../../services/axios"


export const SelectBrands = async ({ codeBrands }) => {
    const [brands, setBrands] = useState([])
    console.log(codeBrands)
    useEffect(() => {
        api.post('ConsultarMarcas', {
            codigoTabelaReferencia: 293,
            codigoTipoVeiculo: 1
        })
            .then(response => response.data)
            .then(data => {
                setBrands(data)
            })
    },[codeBrands])


    return (
        <>
            <SelectComp options={brands} label={'Marca'} />
        </>
    )
}