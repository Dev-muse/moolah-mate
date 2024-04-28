import Link from 'next/link'
import React from 'react'

export const BudgetItem = ({ budget }) => {

    const CalcProgressPercent = () => {
        // % is (spent/total)*100
        const percent = (budget.totalSpend / budget.amount) * 100
        return percent.toFixed(2)
    }

    return (
        <Link href={`/dashboard/expenses/${budget.id}`}
            className='rounded-lg border p-5 
            hover:shadow-md cursor-pointer h-[170px]'>
            <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="rounded-full
                     bg-gray-100 p-4 text-3xl">
                        {budget.icon}
                    </h2>
                    <div className="font-bold capitalize ">
                        <h2>{budget.name}</h2>
                        <h2>{budget.totalItem}</h2>
                    </div>
                </div>
                <h2 className='text-lg font-bold text-primary'>£{budget.amount}</h2>
            </div>
            <div className='mt-5'>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xs text-slate-400">£{budget.totalSpend ? budget.totalSpend : 0} <br />spent</h2>
                    <h2 className="text-xs text-slate-400">£{budget.amount - budget.totalSpend} <br />remaining</h2>

                </div>
                <div className="w-full rounded-full h-2 bg-slate-200">
                    <div className="bg-primary rounded-full h-2"
                        style={{ width: `${CalcProgressPercent()}%` }}
                    ></div>
                </div>
            </div>
        </Link>
    )
}
