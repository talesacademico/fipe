import {createContext, useEffect, useState} from  'react'
import { api } from '../services/axios';

export const ListRefYearMonthContext = createContext([]);

export const dataBransConsultContext = createContext([])

export function ListRefYearMonthContextProvider({children}){
  const [refYearMonth, setRefYearMonth] = useState([])
  
  useEffect(() => {
      api.post('ConsultarTabelaDeReferencia')
        .then(response => response.data)
        .then(data => {
          const yearMonth = data.map((ref) => {
            return { Value: ref.Codigo, Label: ref.Mes }
          })
          setRefYearMonth(yearMonth)
        })
    }, [])

    return (
      <ListRefYearMonthContext.Provider value={refYearMonth}>
          {children}
      </ListRefYearMonthContext.Provider>
    )
}

