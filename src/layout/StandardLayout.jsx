import React, { Suspense } from 'react'
import { Outlet } from 'react-router'



import Navbarloading from '../component/Loading/Navbarloading.jsx'
import Footer from '../component/Footer.jsx'


const Navbar = React.lazy(() => import('../component/Navbar.jsx'));


export default function StandardLayout() {
    return (
        <>
            <div className='bg-[#F5F5F5] '>
                <Suspense fallback={<Navbarloading />}>
                    <Navbar />
                </Suspense>

               
                    <Outlet />
               


                {/* <Footer /> */}
            </div>
        </>

    )
}
