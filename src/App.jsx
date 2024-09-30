

import './App.css'
import LaptopExport from './Components/3-D Component/LaptopExport'
import ProfileV1 from './Components/3D-Profile-Card/3D-Profile'
import ErrorBoundary from './Components/Error/ErrorBoundary'
import Intro from './Components/Front/Intro'
import Header from './Header'

function App() {

  return (
    <>
     <Header/>
     <div className='w-1/2 h-screen'>
     <ProfileV1/>
     </div>
<Intro/>
<ErrorBoundary>
<LaptopExport/></ErrorBoundary>
    </>
  )
}

export default App
