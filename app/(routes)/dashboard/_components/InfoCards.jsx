import { CoinsIcon, PiggyBank, ReceiptText, ReceiptTextIcon, Wallet, Wallet2, Wallet2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const InfoCards = ({ budgetList }) => {

    const [totalBudget, setTotalBudget] = useState(0)
    const [totalSpent, setTotalSpent] = useState(0)


    console.log(budgetList)

    useEffect(() => {
        budgetList && calculateCardInfo()


    }, [budgetList])


    const calculateCardInfo = () => {
        let totalBudget_ = 0
        let totalSpend_ = 0
        budgetList.forEach(budget => {
            totalBudget_ = totalBudget_ + Number(budget.amount);
            totalSpend_ = totalSpend_ + budget.totalSpend
        })
        setTotalBudget(totalBudget_)
        setTotalSpent(totalSpend_)

    }



    return (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        gap-4">
            {budgetList.length > 0 ?
                <>
                    <div className="p-7 border rounded-lg flex items-center justify-between">
                        <div className="">
                            <h2 className="text-sm">Total budget</h2>
                            <h2 className="font-bold text-2xl ">£{totalBudget}</h2>
                        </div>
                        <PiggyBank className='bg-primary text-white p-2 rounded-full
                    w-12 h-12' />

                    </div>
                    <div className="p-7 border rounded-lg flex items-center justify-between">
                        <div className="">
                            <h2 className="text-sm">Total spent</h2>
                            <h2 className="font-bold text-2xl ">£{totalSpent}</h2>
                        </div>
                        <CoinsIcon className='bg-primary text-white p-2 rounded-full
                    w-12 h-12' />

                    </div>
                    <div className="p-7 border rounded-lg flex items-center justify-between">
                        <div className="">
                            <h2 className="text-sm">N.o of budgets</h2>
                            <h2 className="font-bold text-2xl ">{budgetList?.length}</h2>
                        </div>
                        <Wallet className='bg-primary text-white p-2 rounded-full
                    w-12 h-12' />

                    </div>
                </> :
                <>
                    {
                        [1, 2, 3].map((item, index) => {
                            return <div key={index} className="
                            h-[110px] w-full bg-slate-300 rounded-lg animate-pulse">

                            </div>
                        })
                    }
                </>

            }
        </div>
    )
}

export default InfoCards