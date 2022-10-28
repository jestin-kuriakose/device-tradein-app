import React, { useEffect, useState } from 'react'
import { dummyPhoneData } from '../dummyData'
import {
    collection,
    query,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
    addDoc,
  } from "firebase/firestore";
  import { db } from "../firebase";
import { useNavigate } from 'react-router-dom';

const TradeinForm = () => {
    const [phoneData, setPhoneData] = useState([])
    const [selectedPhoneData, setSelectedPhoneData] = useState({})
    const [missingOptions, setMissingOptions] = useState(false)
    const [inputData, setInputData] = useState({
        back_con: "",
        bent: "",
        color: "",
        condition: "",
        misc: "",
        name: "",
        power_on: "",
        screen_con: "",
        size: ""})
const navigate = useNavigate()

    useEffect(()=>{
        const getPhoneData = async () => {
            const querySnapshot = await getDocs(collection(db, "phoneData"));
            let dataWithId = []
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                data["id"] = doc.id
                dataWithId.push(data)
              });
            setPhoneData(dataWithId)
        }
        getPhoneData()
    },[])

    const handleChange = (e) => {
        const [filteredPhoneData] = phoneData.filter(data => data.id.toString() === e.target.value)
        setSelectedPhoneData(filteredPhoneData)
        setInputData(prev=>({...prev, name: filteredPhoneData?.name, phoneId: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const values = Object.values(inputData)
        const index = values.findIndex(v => v === "")
        if(index > -1) {
            setMissingOptions(true)
        } else {
            setMissingOptions(false)
            const docId = sendDataToDatabase(inputData)
            docId.then(id=>navigate(`/quote/${id}`))
        }
        console.log(inputData)
    }

    const sendDataToDatabase = async(data) => {
        let docId
        try {
            const docRef = await addDoc(collection(db, "customerSelection"), data)
            console.log("Document written with ID: ", docRef.id);
            return docRef.id
            
        } catch(err) {
            console.log("Error adding document: ", err)
        }

    }
    
  return (
    <div className='container p-3'>
        <form className='col g-3 justify-content-lg-center'>
        
            <h3 className='display-6 text-center'>What Is The Model Of Your Device Being Evaluated?</h3>
            <p className='lead text-center'>Select the details of your device model from the following options.</p>
            <div className="mb-3 row-auto lg-auto justify-content-center">
                <div className='col-md-6 mx-auto my-0'>
                    <label className="form-label lead">Select your phone</label>
                    <select className='form-select' defaultValue={'DEFAULT'} onChange={handleChange}>
                        <option disabled value={'DEFAULT'}> -- select an option -- </option>
                        {phoneData?.map((data)=>(
                            <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                    </select>
                </div>

                <div className='col-md-6 mx-auto my-0'>
                    <label className="form-label lead">Storage</label>
                    <select className='form-select' defaultValue={'DEFAULT'} onChange={(e)=>setInputData({...inputData, size: e.target.value})}>
                        <option disabled value={'DEFAULT'}> -- select an option -- </option>
                        {selectedPhoneData?.size?.map((d)=>(
                            <option key={selectedPhoneData?.size?.indexOf(d)} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                <div className='col-md-6 mx-auto my-0'>
                    <label className="form-label lead">Color</label>
                    <select className='form-select' defaultValue={'DEFAULT'} onChange={(e)=>setInputData({...inputData, color: e.target.value})}>
                    <option disabled value={'DEFAULT'}> -- select an option -- </option>
                        {selectedPhoneData?.color?.map((d)=>(
                            <option key={selectedPhoneData?.color?.indexOf(d)} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

            <h3 className='mt-5 text-center display-6'>What Is the Condition of Your Device Being Evaluated?</h3>
                <div className='row shadow-lg p-3 my-5 bg-white rounded justify-content-center text-center'>
                    <h5 className='row-auto lead'>What is the physical condition of the device?</h5>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.condition === "VERY GOOD" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'VERY GOOD'} onClick={(e)=>setInputData({...inputData, condition: e.target.value})}>VERY GOOD</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.condition === "GOOD" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'GOOD'} onClick={(e)=>setInputData({...inputData, condition: e.target.value})}>GOOD</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.condition === "ACCEPTABLE" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'ACCEPTABLE'} onClick={(e)=>setInputData({...inputData, condition: e.target.value})}>ACCEPTABLE</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.condition === "BROKEN" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'BROKEN'} onClick={(e)=>setInputData({...inputData, condition: e.target.value})}>BROKEN</button>
                </div>

                <div className='row shadow-lg p-3 mb-5 bg-white rounded justify-content-center text-center'>
                    <h5 className='row-auto lead'>Does your phone power on when charged or plugged in?</h5>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.power_on === "YES" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'YES'} onClick={(e)=>setInputData({...inputData, power_on: e.target.value})}>YES</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.power_on === "NO" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'NO'} onClick={(e)=>setInputData({...inputData, power_on: e.target.value})}>NO</button>
                </div>

                <div className='row shadow-lg p-3 mb-5 bg-white rounded justify-content-center text-center'>
                    <h5 className='row-auto lead'>Is your screen cracked, severely scratched or chipped?</h5>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.screen_con === "YES" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'YES'} onClick={(e)=>setInputData({...inputData, screen_con: e.target.value})}>YES</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.screen_con === "NO" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'NO'} onClick={(e)=>setInputData({...inputData, screen_con: e.target.value})}>NO</button>
                </div>

                <div className='row shadow-lg p-3 mb-5 bg-white rounded justify-content-center text-center'>
                    <h5 className='row-auto lead'>Is your back glass broken, severely scratched or chipped?</h5>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.back_con === "YES" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'YES'} onClick={(e)=>setInputData({...inputData, back_con: e.target.value})}>YES</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.back_con === "NO" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'NO'} onClick={(e)=>setInputData({...inputData, back_con: e.target.value})}>NO</button>
                </div>

                <div className='row shadow-lg p-3 mb-5 bg-white rounded justify-content-center text-center'>
                    <h5 className='row-auto lead'>Is your phone bent?</h5>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.bent === "YES" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'YES'} onClick={(e)=>setInputData({...inputData, bent: e.target.value})}>YES</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.bent === "NO" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'NO'} onClick={(e)=>setInputData({...inputData, bent: e.target.value})}>NO</button>
                </div>

                <div className='row shadow-lg p-3 mb-5 bg-white rounded justify-content-center text-center'>
                    <h5 className='row-auto lead'>Do ALL of the following function properly?</h5>
                    <p className='lead'>This includes: Cameras, Speakers, Home Button, Power Button, Volume Button, Microphone, and Battery.</p>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.misc === "YES" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'YES'} onClick={(e)=>setInputData({...inputData, misc: e.target.value})}>YES</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.misc === "NO" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'NO'} onClick={(e)=>setInputData({...inputData, misc: e.target.value})}>NO</button>
                    <button className={"btn col-auto lg-auto m-3 " + (inputData.misc === "NOT SURE" ? "btn-outline-secondary":"btn-secondary")} type='button' value={'NOT SURE'} onClick={(e)=>setInputData({...inputData, misc: e.target.value})}>NOT SURE</button>
                </div>
                {missingOptions && <p style={{textAlign: "center", color: "Red"}}>All the above fields are mandatory, Please make selection to all the above options to continue</p>}
            </div>

            <div className='row justify-content-center'>
                <button type="submit" className="btn btn-lg col-lg-2 btn-dark row-auto lg-auto justify-content-center" onClick={handleSubmit}>GET A QUOTE</button>
            </div>

        </form>
    </div>
  )
}

export default TradeinForm