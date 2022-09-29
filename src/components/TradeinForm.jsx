import React, { useEffect, useState } from 'react'
import { dummyPhoneData } from '../dummyData'

const TradeinForm = () => {
    const [phoneData, setPhoneData] = useState([])
    const [selectedPhoneData, setSelectedPhoneData] = useState({})
    const [inputData, setInputData] = useState({})

    useEffect(()=>{
        const getPhoneData = () => {
            setPhoneData(dummyPhoneData)
        }
        getPhoneData()
    },[])

    const handleChange = (e) => {
        const [filteredPhoneData] = phoneData.filter(data => data.id == e.target.value)
        setSelectedPhoneData(filteredPhoneData)
        setInputData(prev=>({...prev, name: filteredPhoneData.name}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputData)
    }
    
  return (
    <div className='container p-3'>
        <form className='col g-3 justify-content-lg-center'>
        
            <h3>What Is The Model Of Your Device Being Evaluated?</h3>
            <p>Select the details of your device model from the following options.</p>
            <div className="mb-3 row-auto lg-auto justify-content-center">
                <div>
                    <label className="form-label">Select your phone</label>
                    <select className='form-select' defaultValue={'DEFAULT'} onChange={handleChange}>
                        <option disabled value={'DEFAULT'}> -- select an option -- </option>
                        {phoneData.map((data)=>(
                            <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="form-label">Storage</label>
                    <select className='form-select' defaultValue={'DEFAULT'} onChange={(e)=>setInputData({...inputData, size: e.target.value})}>
                        <option disabled value={'DEFAULT'}> -- select an option -- </option>
                        {selectedPhoneData?.size?.map((d)=>(
                            <option key={selectedPhoneData?.size?.indexOf(d)} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="form-label">Color</label>
                    <select className='form-select' defaultValue={'DEFAULT'} onChange={(e)=>setInputData({...inputData, color: e.target.value})}>
                    <option disabled value={'DEFAULT'}> -- select an option -- </option>
                        {selectedPhoneData?.color?.map((d)=>(
                            <option key={selectedPhoneData?.color?.indexOf(d)} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

            <h3 className='mt-5 text-center'>What Is the Condition of Your Device Being Evaluated?</h3>
                <div className='row shadow-lg p-3 my-5 bg-white rounded'>
                    <h5 className='row-auto'>What is the physical condition of the device?</h5>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.condition === "VERY GOOD" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'VERY GOOD'} onClick={(e)=>setInputData({...inputData, condition: e.target.value})}>VERY GOOD</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.condition === "GOOD" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'GOOD'} onClick={(e)=>setInputData({...inputData, condition: e.target.value})}>GOOD</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.condition === "ACCEPTABLE" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'ACCEPTABLE'} onClick={(e)=>setInputData({...inputData, condition: e.target.value})}>ACCEPTABLE</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.condition === "BROKEN" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'BROKEN'} onClick={(e)=>setInputData({...inputData, condition: e.target.value})}>BROKEN</button>
                </div>

                <div className='row shadow-lg p-3 mb-5 bg-white rounded'>
                    <h5 className='row-auto'>Does your phone power on when charged or plugged in?</h5>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.power_on === "YES" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'YES'} onClick={(e)=>setInputData({...inputData, power_on: e.target.value})}>YES</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.power_on === "NO" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'NO'} onClick={(e)=>setInputData({...inputData, power_on: e.target.value})}>NO</button>
                </div>

                <div className='row shadow-lg p-3 mb-5 bg-white rounded'>
                    <h5 className='row-auto'>Is your screen cracked, severely scratched or chipped?</h5>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.screen_con === "YES" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'YES'} onClick={(e)=>setInputData({...inputData, screen_con: e.target.value})}>YES</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.screen_con === "NO" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'NO'} onClick={(e)=>setInputData({...inputData, screen_con: e.target.value})}>NO</button>
                </div>

                <div className='row shadow-lg p-3 mb-5 bg-white rounded'>
                    <h5 className='row-auto'>Is your back glass broken, severely scratched or chipped?</h5>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.back_con === "YES" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'YES'} onClick={(e)=>setInputData({...inputData, back_con: e.target.value})}>YES</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.back_con === "NO" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'NO'} onClick={(e)=>setInputData({...inputData, back_con: e.target.value})}>NO</button>
                </div>

                <div className='row shadow-lg p-3 mb-5 bg-white rounded'>
                    <h5 className='row-auto'>Is your phone bent?</h5>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.bent === "YES" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'YES'} onClick={(e)=>setInputData({...inputData, bent: e.target.value})}>YES</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.bent === "NO" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'NO'} onClick={(e)=>setInputData({...inputData, bent: e.target.value})}>NO</button>
                </div>

                <div className='row shadow-lg p-3 mb-5 bg-white rounded'>
                    <h5 className='row-auto'>Do ALL of the following function properly?</h5>
                    <p>This includes: Cameras, Speakers, Home Button, Power Button, Volume Button, Microphone, and Battery.</p>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.bent === "YES" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'YES'} onClick={(e)=>setInputData({...inputData, misc: e.target.value})}>YES</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.bent === "NO" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'NO'} onClick={(e)=>setInputData({...inputData, misc: e.target.value})}>NO</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.bent === "NOT SURE" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'NOT SURE'} onClick={(e)=>setInputData({...inputData, misc: e.target.value})}>NOT SURE</button>
                </div>

            </div>

            <div className='row justify-content-center'>
                <button type="submit" className="btn col-lg-2 btn-primary row-auto lg-auto justify-content-center" onClick={handleSubmit}>GET A QUOTE</button>
            </div>

        </form>
    </div>
  )
}

export default TradeinForm