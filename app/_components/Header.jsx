import React from 'react'
import { Button } from '../../components/ui/button'

const Header = () => {
    return (
        <header className="  flex justify-between p-5 shadow-md ">
            <a href="#">Logo</a>
            <Button className=''>Get Started</Button>
        </header>
    )
}

export default Header