import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { db } from '../firebase'

const QuoteResult = () => {
  const params = useParams()
  const quoteId = params.quoteId
  const [inputData, setInputData] = useState({})
  const [phoneData, setPhoneData] = useState({})
  const [documentNotFound, setDocumentNotFound] = useState(false)

  useEffect(()=> {
    const getCustomerInputFromDB = async() => {
      try {
        const res = await getDoc(doc(db, "customerSelection", quoteId))
        if(res.exists()) {
          setInputData(res.data())
          getPhoneDataFromDB(res.data()?.phoneId)
        } else {
          setDocumentNotFound(true)
        }
        
      } catch(err) {
        console.log(err)
      }
    }
    getCustomerInputFromDB()
  },[])

  const getPhoneDataFromDB = async(id) => {
    try{
      const res = await getDoc(doc(db, "phoneData", id))
      console.log(res.data())
      setPhoneData(res.data())
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
        <Header/>
          
          {Object.keys(phoneData).length === 0 ?
          
          <div className='position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light'>
            {documentNotFound ?
              <div>
                <h3 className="display-5">No Quote found</h3>
                <p className="lead">Contact us for more info</p>
              </div>
            :<div>
              <div className="spinner-border" style={{width:"3rem",height: "3rem"}} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>}
          </div>  :

          <div>
            <div class="position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
              <div class="col-md-5 p-lg-5 mx-auto my-5">
                <h1 class="display-4 fw-normal">Your Device Quote is Complete</h1>
              </div>
            </div> 

            <div className="d-md-flex flex-md-equal p-3 p-md-5 text-center">
                <div className="bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                  <div className="my-3 py-3">
                    <h2 className="display-5">{phoneData.name}</h2>
                    <p className="lead">{inputData.size}</p>
                  </div>
                  <div className="bg-light shadow-sm mx-auto" style={{width: "80%", height: "300px", borderRadius: "21px 21px 0 0"}}></div>
                </div>
                <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                  <div className="my-3 p-3">
                    <p className="lead">Based on the information you provided, this is the best estimate of your device's value</p>
                    <h2 className="display-5">${phoneData.maxPrice}</h2>
                    <p className="lead">*Your offer will be confirmed after inspection by our technician,</p>
                    <button type="button" class="btn btn-dark btn-lg">Get Shipping label</button>
                  </div>
                </div>
              </div>
            </div> }
        <Footer/>
    </div>
  )
}

export default QuoteResult