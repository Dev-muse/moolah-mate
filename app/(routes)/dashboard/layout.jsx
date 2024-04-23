import React from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from '../../_components/DashboardHeader'

const DashboardLayout = ({ children }) => {
    return (
        <div>
            <div className='hidden   md:block fixed md:w-64'><SideNav /></div>
            <div className='ml-64  '>
                <DashboardHeader />
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout