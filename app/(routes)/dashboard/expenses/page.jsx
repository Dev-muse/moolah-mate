'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { db } from '../../../../utils/dbConfig';
import { budgets, Expenses } from '../../../../utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import ExpenseListTable from './_components/ExpenseListTable';

const ExpensesPage = () => {

    const { user } = useUser()



    const [budgetList, setBudgetList] = useState([])
    const [expensesList, setExpensesList] = useState([])


    useEffect(() => {
        user && getBudgetList();

    }, [user])
    const getAllExpenses = async () => {
        const result = await db.select({
            id: Expenses.id,
            name: Expenses.name,
            amount: Expenses.amount,
            createdAt: Expenses.createdAt
        }).from(budgets).rightJoin(Expenses, eq(budgets.id, Expenses.budgetId)).where(eq(budgets.createdBy, user?.primaryEmailAddress.emailAddress)).orderBy(desc(Expenses.id))

        setExpensesList(result)
    }

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

        getAllExpenses()
    }

    return (
        <div className="p-10">
            <h2 className="text-primary text-center text-2xl font-bold">
                Expenses
            </h2>
            <ExpenseListTable
                refreshData={() => getBudgetList()}
                expensesList={expensesList}
            />
            <div className="mt-4 grid gap-4 grid-cols-1 lg:grid-cols-2">
            </div>
        </div>
    )

}

export default ExpensesPage