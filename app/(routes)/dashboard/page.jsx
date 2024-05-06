'use client';

import React, { useEffect, useState } from 'react';
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
} from "@clerk/nextjs";
import { db } from '../../../utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import InfoCards from './_components/InfoCards';
import { budgets, Expenses } from '../../../utils/schema';
import BarchartDashboard from './_components/BarchartDashboard';
import { BudgetItem } from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';


const Dashboard = () => {

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
        <div className='p-4'>
            <h2 className='font-medium text-3xl'>Welcome {user?.fullName}</h2>
            <p className="text-gray-500 my-2">Here is an overview of what's been happening with your money:</p>

            <InfoCards budgetList={budgetList} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                <div className="md:col-span-2">
                    <BarchartDashboard budgetList={budgetList} />
                    <ExpenseListTable
                        refreshData={() => getBudgetList()}
                        expensesList={expensesList}
                    />
                </div>
                <div className="grid gap-5">
                    <h4 className="font-bold text-lg">Latest Budgets</h4>
                    {
                        budgetList?.map((budget, index) => {
                            return <BudgetItem budget={budget} key={index} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard