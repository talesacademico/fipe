
import { useEffect, useState } from "react"
import { SelectComp } from "../../components/select"
import { api } from "../../services/axios"
import { List } from "./components/list"
import { Button, FlexColumm } from "./styled"
import { Exemple1 } from "../../components/reactChart/CompLineChart"
import { getModelBrantsApi, getPriceApi, getYearModelApi, getYearModelByYearApi } from "../../services/fipe"



export const Dashboard = () => {


  const [listBrands, setListBrands] = useState([])
  const [listrefYearMonth, setlistRefYearMonth] = useState([])
  const [listModelYears, setListModelYears] = useState([])
  const [listBrandsModel, setListBrantsModel] = useState([])
  const [dataPriceArray, setDataPriceArray] = useState([])

  //const [typeVehivle, settypeVehivle] = useState(1)

  const [dataVehicle, setDataVeicle] = useState([])

  const [dataModel, setDataModel] = useState({
    refTable: 293,
    codeBrands: 1,
    codeModel: 2,
    typeFuel: 1,
    yearModel: 1998,

  })

  function setAttributeRefTable({ value }) {
    setListBrands([])
    setDataModel({
      ...dataModel,
      refTable: value
    })
  }

  async function getModelBrands({ value }) {
    setDataModel({
      ...dataModel,
      codeBrands: value
    })
    const { refTable } = dataModel
    const payload = await getModelBrantsApi({ value, code: 1, refTable })
    const { years, models } = payload
    setListModelYears(years)
    setListBrantsModel(models)
  }

  async function getYearModelByYear({ value }) {
    const data = value
    const [yearModel, typeFuel] = data.split('-')
    setDataModel({
      ...dataModel,
      yearModel,
      typeFuel
    })
    const payload = {
      codigoTipoVeiculo: 1,
      codigoTabelaReferencia: dataModel.refTable,
      codigoMarca: dataModel.codeBrands,
      ano: data,
      anoModelo: yearModel,
      codigoTipoCombustivel: typeFuel
    }
    setListBrantsModel(
      await getYearModelByYearApi(payload)
    )


  }
  async function getPrice() {
    const prices = []
    let ref = dataModel.refTable
    for (let i = 0; i < 10; i++) {


      const payload = {
        codigoTabelaReferencia: ref,
        codigoMarca: dataModel.codeBrands,
        codigoModelo: dataModel.codeModel,
        codigoTipoVeiculo: 1,
        anoModelo: dataModel.yearModel,
        codigoTipoCombustivel: dataModel.typeFuel,
        tipoConsulta: 'tradicional'
      }
      ref = ref - 1

      const data = await getPriceApi(payload)

      const formateDate =  Object.entries(data).map(element => {
        console.log(element)
        const label = element[0].split(/(?=[A-Z])/)
          .join(',').replace(',', ' ')
        return { label, value: element[1] }
      })
      

      if (i === 0) {
        setDataVeicle(formateDate)
      }

      data.Valor = data.Valor.replace(/\D/, '')
        .replace('$ ', '').split(',')[0]

      prices.unshift(data)
    }

    setDataPriceArray(prices)
  }

  async function getYearModel({ value }) {
    const codeModel = value
    setDataModel({
      ...dataModel,
      codeModel
    })
    const payload = {
      codigoTipoVeiculo: 1,
      codigoTabelaReferencia: dataModel.refTable,
      codigoMarca: dataModel.codeBrands,
      codigoModelo: codeModel,

    }
    setListModelYears(
      await getYearModelApi(payload)
    )
  }



  useEffect(() => {
    setListModelYears([])
    setListBrantsModel([])
    api.post('ConsultarMarcas', {
      codigoTabelaReferencia: dataModel.refTable,
      codigoTipoVeiculo: 1
    })
      .then(response => response.data)
      .then(data => {
        setListBrands(data)
      })
  }, [dataModel.refTable])

  useEffect(() => {
    api.post('ConsultarTabelaDeReferencia')
      .then(response => response.data)
      .then(data => {
        const refYearMoth = data.map((ref) => {
          return { Value: ref.Codigo, Label: ref.Mes }
        })

        setlistRefYearMonth(refYearMoth)
        setDataModel({
          ...dataModel,
          refTable: refYearMoth[0].Value
        })

      })
  }, [])

  return (
    <main>
      {dataPriceArray[0] && <Exemple1 data={dataPriceArray} />}
      <FlexColumm>
        <div>
          <SelectComp options={listrefYearMonth} onChange={setAttributeRefTable} label={'Mês Referência'} />
          <SelectComp options={listBrands} onChange={getModelBrands} label={'Marca'} />
          <SelectComp options={listModelYears} onChange={getYearModelByYear} label={'Ano Modelo'} />
          <SelectComp options={listBrandsModel} onChange={getYearModel} label={'Modelo'} placeholder={'Selecione'} />
          <Button onClick={getPrice}>Buscar</Button>
        </div>
        <div>
          {dataVehicle && <List data={dataVehicle}></List>}
        </div>
      </FlexColumm>
    </main>
  )
}