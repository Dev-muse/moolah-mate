import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashboardHeader = () => {
    return (
        <div className='p-5 border-b shadow-sm flex items-center justify-between'>
            <div className="">Dashboard</div>
            <div className="">
                <UserButton />
            </div>
        </div>
    )
}

export default DashboardHeader