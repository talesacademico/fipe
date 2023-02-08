import { useContext, useState } from "react"
import { Button } from "react-bootstrap"
import { Loading } from "../../../components/loading/Loading"
import { Exemple1 } from "../../../components/reactChart/CompLineChart"
import { SelectComp } from "../../../components/select"
import { ListRefYearMonthContext } from "../../../context/FipeContext"
import { getBrands, getModelBrantsApi, getPriceApi, getYearModelApi, getYearModelByYearApi } from "../../../services/fipe"
import { List } from "../../dashboard/components/list"
import { FlexColumm } from "../../dashboard/styled"

export const Forms = () => {

  const listRefYearMonth = useContext(ListRefYearMonthContext)
  const [listBrands, setListBrands] = useState([])
  const [listBrandsModel, setListBrantsModel] = useState([])
  const [listModelYears, setListModelYears] = useState([])
  const [dataPriceArray, setDataPriceArray] = useState([])
  const [graphic, setGraphic] = useState([])
  const [isVisibleGraphic, setIsVisibleGraphic] = useState(false)


  const [dataConsult, setDataConsult] = useState({
    refTable: 0,
    codeBrands: 1,
    codeModel: 2,
    typeFuel: 1,
    yearModel: 1998,
    codeType: 1,

  })

  async function handleClickRef({ value }) {
    setDataConsult({
      ...dataConsult,
      refTable: value
    })
    setListBrands(await getBrands(value, 1))
  }

  async function handleClickBrands({ value }) {
    setDataConsult({
      ...dataConsult,
      codeBrands: value
    })
    const payload = { value, code: 1, refTable: dataConsult.refTable }
    const { years, models } = await getModelBrantsApi(payload)
    setListBrantsModel(models)
    setListModelYears(years)
  }

  async function handleClickModels({ value }) {
    setDataConsult({
      ...dataConsult,
      codeModel: value
    })
    const payload = {
      codigoTipoVeiculo: 1,
      codigoTabelaReferencia: dataConsult.refTable,
      codigoMarca: dataConsult.codeBrands,
      codigoModelo: value,

    }
    setListModelYears(await getYearModelApi(payload))

  }

  async function handleClickYear({ value }) {
    const data = value
    const [yearModel, typeFuel] = data.split('-')

    setDataConsult({
      ...dataConsult,
      yearModel,
      typeFuel
    })

    const payload = {
      codigoTipoVeiculo: 1,
      codigoTabelaReferencia: dataConsult.refTable,
      codigoMarca: dataConsult.codeBrands,
      ano: data,
      anoModelo: yearModel,
      codigoTipoCombustivel: typeFuel
    }
    setListBrantsModel(
      await getYearModelByYearApi(payload)
    )
  }

  async function getPrice() {
    if(dataConsult.yearModel){
      setGraphic([])
      setIsVisibleGraphic(true)
      setDataPriceArray(await getPriceApi({ ...dataConsult, consults: 1 }))
      setGraphic(await getPriceApi({ ...dataConsult, consults: 24 }))
      setIsVisibleGraphic(false)
    }
  }

  return (
    <>
      {graphic[0] && <>
        <Exemple1 data={graphic} />
      </>
      }
      <Loading isVisible={isVisibleGraphic} />
      <FlexColumm>
        <div>
          <SelectComp options={listRefYearMonth}
            onChange={handleClickRef} label={'Mês Referência'} />
          <SelectComp options={listBrands}
            onChange={handleClickBrands} label={'Marca'} />
          <SelectComp options={listBrandsModel}
            label={'Modelo'} onChange={handleClickModels} />
          <SelectComp options={listModelYears} onChange={handleClickYear}
            label={'Ano'} />
          <Button onClick={getPrice}>Buscar</Button>
        </div>
        <div>
          <List data={dataPriceArray} />
        </div>
      </FlexColumm>
    </>
  )
}
