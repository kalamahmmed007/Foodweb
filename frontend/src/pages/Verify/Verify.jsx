import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from './../../components/context/StoreContext'
import axios from 'axios'

const Verify = () => {

  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const { url } = useContext(StoreContext)
  const navigate = useNavigate()

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/verify",
        { success, orderId }
      )

      if (response.data.success) {
        navigate('/myorders')
      } else {
        navigate('/')
      }
    } catch (error) {
      navigate('/')
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      
      <div className="spinner-border text-success mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      <h5 className="fw-semibold">Verifying your payment</h5>
      <p className="text-muted">Please wait, do not refresh the page</p>

    </div>
  )
}

export default Verify
