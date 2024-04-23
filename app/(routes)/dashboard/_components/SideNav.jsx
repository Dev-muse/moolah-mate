'use client';

import Image from 'next/image'
import {
    LayoutDashboard, DiamondPlus, PiggyBank, HandCoins
} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const SideNav = () => {
    const sideBarMenu = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budget',
            icon: PiggyBank,
            path: '/dashboard/budget'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: HandCoins,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: DiamondPlus,
            path: '/dashboard/upgrade'
        },
    ]
    const route = usePathname();


    return (
        <div className='h-screen  border shadow-md'>
            <Image src='/logo.svg' alt='logo'
                width={160} height={100}
                className='ml-5 my-5' />

            <div className="mt-5 ">
                {sideBarMenu.map((item) => {
                    return (
                        <Link key={item.id}
                            href={item.path}>
                            <h2
                                className={`flex items-center p-5 gap-2
                                font-medium text-gray-500 rounded-md
                                cursor-pointer hover:bg-gray-100
                                 hover:text-primary ${route === item.path ? 'bg-gray-100 text-primary' : ''}`}>
                                <item.icon />
                                {item.name}
                            </h2>
                        </Link>
                    )
                })}
            </div>
            <div className="fixed bottom-10
             flex gap-x-2 items-center p-5 ">
                <UserButton />
                <p className='font-medium'>Profile</p>
            </div>

        </div>
    )
}

export default SideNav