'use client';

import { useEffect, useState } from 'react';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../../../../../utils/dbConfig'
import { budgets, Expenses, } from '../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { BudgetItem } from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';



const ExpenseDetails = ({ params }) => {
    const { user } = useUser()
    const [budgetInfo, setBudgetInfo] = useState({})
    useEffect(() => {
        user && getBudgetInfo()

    }, [user])

    const getBudgetInfo = async () => {
        const result = await db.select(
            {
                ...getTableColumns(budgets),
                totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
                totalItem: sql`count(${Expenses.id})`.mapWith(Number),
            }
        ).from(budgets).leftJoin(
            Expenses, eq(budgets.id, Expenses.budgetId)
        ).where(eq(budgets.createdBy, user?.primaryEmailAddress.emailAddress))
            .where(eq(budgets.id, params.id)).groupBy(budgets.id)

        setBudgetInfo(result[0])
        console.log('budget info', result)

        console.log('budgetstate', budgetInfo)

    }



    return (
        <div className="p-10">
            <h2 className="text-primary text-center text-2xl font-bold">
                My Expenses
            </h2>
            <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
                {
                    budgetInfo ? (<BudgetItem budget={budgetInfo} />
                    ) : (<div className="bg-gray-200 h-[170px] animate-pulse w-full rounded-lg"></div>)
                }
                <AddExpense budgetId={params.id} user={user}
                    refreshData={() => getBudgetInfo()} />
            </div>
        </div>
    )
}

export default ExpenseDetails;