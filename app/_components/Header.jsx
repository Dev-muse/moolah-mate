

import React from 'react'
import { Button } from '../../components/ui/button'
import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';


const Header = () => {
    const { user, isSignedIn } = useUser();
    return (
        <header className="z-40 flex justify-between p-5 shadow-md ">
            <a href="#">
                <img src="/logo.svg" alt="logo"
                    width={160} height={100} />
            </a>
            {isSignedIn ? <UserButton /> : <Link href='/sign-in'><Button className='cursor-pointer'>Get Started</Button></Link>}
        </header>
    )
}

export default Header