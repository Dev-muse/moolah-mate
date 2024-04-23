'use client';

import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from '../../_components/DashboardHeader'
import { db } from '../../../utils/dbConfig';
import { budgets } from '../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }) => {

    const { user } = useUser();
    const router = useRouter();
    const checkUserBudgets = async () => {
        const result = await db.select().from(budgets).where(eq(budgets.createdBy, user?.primaryEmailAddress.emailAddress))

        if (result.length == 0) {
            router.push('/dashboard/budgets');
        }
    }

    useEffect(() => {
        user && checkUserBudgets()


    }, [user])



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