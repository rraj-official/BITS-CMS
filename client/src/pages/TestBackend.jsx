import { responsiveFontSizes } from '@mui/material'
import react, {useEffect, useState} from 'react'

export default function TestBackend(){
    const [backendData, setBackendData]=useState([{}])
    useEffect(()=>{
        fetch("/api").then(
            response=>response.json()
        ).then(
            data=>{
                setBackendData(data)
                //console.log(backendData) //this doesnt print the data
            }
        )
    }, [])
    console.log(backendData) //this prints the data
    return(
        <div>
            
        </div>
    )
}