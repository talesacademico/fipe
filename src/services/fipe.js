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

export const getBrands = async (code, ref) => {
  let res
  await api.post('ConsultarMarcas', {
    codigoTabelaReferencia: code,
    codigoTipoVeiculo: ref
  })
    .then(response => response.data)
    .then(data => {
      res = data
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

export async function getPriceApi({ refTable, codeBrands, codeModel, codeType, yearModel, typeFuel, consults }) {
  let prices = []

  for (let i = 0; i < consults; i++) {
    const payload = {
      codigoTabelaReferencia: refTable,
      codigoMarca: codeBrands,
      codigoModelo: codeModel,
      codigoTipoVeiculo: codeType,
      anoModelo: yearModel,
      codigoTipoCombustivel: typeFuel,
      tipoConsulta: 'tradicional'
    }


    await api.post('ConsultarValorComTodosParametros', payload)
      .then(response => response.data)
      .then(data => {
        if (data.codigo === '2' || data.codigo === '0') {
          return
        }
        const dataPrice = Object.entries(data).map(element => {
          const label = element[0].split(/(?=[A-Z])/)
            .join(',').replace(',', ' ')
          return { label, value: element[1] }
        })

        if (consults === 1) {
          dataPrice.splice(5, 1)
          dataPrice.splice(6, 3)
          prices.push(dataPrice)
          return
        }

        if (data.Valor) {
          data.Valor = data.Valor.replace(/\D/, '')
            .replace('$ ', '').replace('.', '').split(',')[0]
          prices.unshift(data)
        }

      }).catch(e => {
        console.log(e)
      })
    refTable = refTable - 1
  }

  if (consults === 1) {
    return prices[0]
  }

  return prices
}

