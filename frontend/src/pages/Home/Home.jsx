import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {

  const [category, setCategory] = useState('All')

  return (
    <div className="container-fluid p-0">

      {/* Header Section */}
      <Header />

      {/* Explore Menu */}
      <div className="container my-5">
        <ExploreMenu
          category={category}
          setCategory={setCategory}
        />
      </div>

      {/* Food Display */}
      <div className="container my-5">
        <FoodDisplay category={category} />
      </div>

      {/* App Download */}
      <div className="bg-light py-5 mt-5">
        <div className="container">
          <AppDownload />
        </div>
      </div>

    </div>
  )
}

export default Home
