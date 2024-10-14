import React from 'react'
import Hero from '../components/Home/Hero'
import Events from '../components/Home/Events'
import Landing1 from './Landing1'
import Landing2 from './Landing2'
import Landing3 from './Landing3'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Landing1/>
      <Landing2/>
      <Landing3/>
    </div>
  )
}

export default Home
