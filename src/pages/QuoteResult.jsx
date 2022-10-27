import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { db } from '../firebase'

const QuoteResult = () => {
  const params = useParams()
  const quoteId = params.quoteId

  useEffect(()=> {
    const getCustomerInputFromDB = async() => {
      try {
        const res = await getDoc(doc(db, "customerSelection", quoteId))
        console.log(res.data())
      } catch(err) {
        console.log(err)
      }
    }
    getCustomerInputFromDB()
  })
  return (
    <div>
        <Header/>
        {quoteId}
        <Footer/>
    </div>
  )
}

export default QuoteResult