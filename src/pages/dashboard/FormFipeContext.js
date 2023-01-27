import {createContext, useEffect, useState } from 'react'
import { api } from '../../services/axios';

export const FormFipeContext = createContext({});

export function FormFipeProvider({children}) {
    const [dataModel, setDataModel] = useState({
        refTable: 292,
        codeBrands: 1,
        codeModel: 2,
        typeFuel: 1,
        yearModel: 1998,
        typeVehicle: 1
    
    })

    useEffect(() => {
        api.post('ConsultarTabelaDeReferencia')
            .then(response => response.data)
            .then(data => {
                const refYearMoth = data.map((ref) => {
                    return { Value: ref.Codigo, Label: ref.Mes }
                })
                setDataModel({
                    ...dataModel,
                    refTable: refYearMoth[0].Value
                })

            })
    }, []);

    return (
        <FormFipeContext.Provider value={dataModel}>
              {children}
        </FormFipeContext.Provider>
    )
}