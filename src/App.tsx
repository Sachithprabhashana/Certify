import React from 'react';
import './App.less';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from "./routes/MainRouter";


function App() {
  // const [openMenu,setOpenMenu] = useState(false);
  return (
      <>
          <BrowserRouter>
              <MainRouter />
          </BrowserRouter>
      </>
    // <div className="App">
    //   <div className='menuIcon' style={{
    //     backgroundColor:'#84B501',
    //     height:'60px',
    //     paddingTop:'30px',
    //     paddingLeft:'30px',
    //
    //   }}>
    //     <MenuOutlined style={{fontSize:30}} onClick={()=>{
    //       setOpenMenu(true)
    //     }} />
    //   </div>
    //   <span className='headerMenu'>
    //   <Navbar />
    //   </span>
    //   <Drawer placement='left' open={openMenu} onClose={()=> setOpenMenu(false)} closable={false} bodyStyle={{backgroundColor:'#84B501'}}>
    //   <Navbar isInline />
    //   </Drawer>
    //
    //   <Routes>
    //     <Route path='/' element={<Home />} />
    //     <Route path='/about' element={<About />} />
    //     <Route path='/contact' element={<Contact />} />
    //     <Route path='/login' element={<Login />} />
    //
    //   </Routes>
    //
    // </div>
  );
}

export default App;
