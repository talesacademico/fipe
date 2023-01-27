import { useContext } from 'react'
import { FormFipeContext } from '../FormFipeContext'
import { SelectBrands } from './selectBrands'
import { SelectRef } from './selectRef'

export const FormFipe = () => {
  const data = useContext(FormFipeContext)
  return (
    <>
      <SelectRef refTable={data.refTable} type={data.typeVehicle} />
      <SelectBrands codeBrands={data.codeBrands} />
    </>
  )
}