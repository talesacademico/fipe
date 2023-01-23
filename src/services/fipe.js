import { api } from "./axios"

export const getModelBrantsApi = async ({ code, refTable, value }) => {
  let res
  await api.post('ConsultarModelos', {
    codigoTipoVeiculo: code,
    codigoTabelaReferencia: refTable,
    codigoMarca: value
  }).then(response => response.data)
    .then(data => {
      res = { years: data.Anos, models: data.Modelos }
    })

  return res
}

export const getYearModelByYearApi = async (payload) => {
  let res
  await api.post('ConsultarModelosAtravesDoAno', payload)
    .then(response => response.data)
    .then(data => {
      res = data
    })
  return res
}

export const getYearModelApi = async (payload) => {
  let res
  await api.post('ConsultarAnoModelo', payload)
    .then(response => response.data)
    .then(data => {
      res = data
    })

  return res
}

export const getPriceApi = async (payload) => {
  let res
  await api.post('ConsultarValorComTodosParametros', payload)
    .then(response => response.data)
    .then(data => {
      if (data.codigo === '2') {
        res = false
      }

      res =data
    
    })
  return res
}

