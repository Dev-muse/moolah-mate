'use client';

import BudgetList from './_components/BudgetList';


const Budgets = () => {
    return (
        <div className='mt-5 p-5'>
            <h2 className="my-5 text-3xl text-center font-bold text-primary">
                My Budgets
            </h2>
            <BudgetList />
        </div>
    )
}

export default Budgets;