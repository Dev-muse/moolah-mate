'use effect';

import { useEffect, useState } from 'react';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../../../../../utils/dbConfig'
import { budgets, Expenses, } from '../../../../../utils/schema'
import CreateBudget from './CreateBudget'
import { useUser } from '@clerk/nextjs'
import { BudgetItem } from './BudgetItem';

const BudgetList = () => {

    const { user } = useUser();

    const [budgetList, setBudgetList] = useState([])


    useEffect(() => {
        user && getBudgetList();

    }, [user])

    const getBudgetList = async () => {
        const result = await db.select({
            ...getTableColumns(budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
            .from(budgets).leftJoin(
                Expenses, eq(budgets.id, Expenses.budgetId)
            ).where(eq(budgets.createdBy, user?.primaryEmailAddress.emailAddress))
            .groupBy(budgets.id)
            .orderBy(desc(budgets.id))

        setBudgetList(result)
    }




    return (
        <div className='mt-7'>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <CreateBudget refreshData={() => getBudgetList()} />
                {
                    budgetList.length > 0 ? budgetList.map(budget => {
                        return <BudgetItem key={budget.id}
                            budget={budget} />
                    }) : [1, 2, 3, 4, 5].map((item, index) => {
                        return <div key={index} className="w-full rounded-lg  bg-gray-200
                        h-[170px] animate-pulse"></div>
                    })
                }
            </div>
        </div >
    )
}

export default BudgetList