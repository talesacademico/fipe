import { useEffect, useState } from "react"
import { ContentSelect } from "./styled"


export const SelectComp = ({ options, onChange, label }) => {

    const [placeholder, setPlaceholder] = useState('Selecione')
    const [currentValue, setCurrentValue] = useState('Selecione')

    useEffect(()=>{
        setPlaceholder('Selecione')
    },[options])

    const onSelect = ({ target }) => {
        const options = target
        const index = target.selectedIndex
        options[index].style.color = 'blue'
        
        if(options[index].value === currentValue){
            return
        }

        setPlaceholder(options[index].text)
        setCurrentValue(options[index].value)
        onChange(target)
    }

    return (
        <ContentSelect>
            <label>
                {label}
                <select onChange={onSelect}>
                    <option value={currentValue}>{placeholder}</option>
                    {options.map(element => {
                        return (<option key={element.Label}
                            value={element.Value}>{element.Label}
                        </option>)
                    }
                    )}
                </select>
            </label>

        </ContentSelect>
    )
}