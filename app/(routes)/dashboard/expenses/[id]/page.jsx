'use client';

import { useEffect, useState } from 'react';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../../../../../utils/dbConfig'
import { budgets, Expenses, } from '../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { BudgetItem } from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Trash, Pen, PenBox, ArrowBigLeftIcon } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';




const ExpenseDetails = ({ params }) => {
    const { user } = useUser()
    const [budgetInfo, setBudgetInfo] = useState({})
    const [expensesList, setExpensesList] = useState([])
    const route = useRouter();
    useEffect(() => {
        user && getBudgetInfo()

    }, [user])

    // get budget information
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

        // expenses
        getExpenseList()

    }


    // get latest expenses 
    const getExpenseList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.budgetId))

        setExpensesList(result)

    }


    const deleteBudget = async () => {
        // must delete expenses first or get foreign constraint error
        const deleteExpenseResult = await db.delete(Expenses)
            .where(eq(Expenses.budgetId, params.id)).returning()

        if (deleteExpenseResult) {
            const result = await db.delete(budgets)
                .where(eq(budgets.id, params.id)).returning()
            console.log('delete result', result)
        }

        toast(`${budgetInfo.name} budget deleted!`)
        route.replace('/dashboard/budgets');
    }

    const router = useRouter()

    return (
        <div className="p-10">
            <h2 className="text-primary text-center 
            text-2xl font-bold flex flex-col md:flex-row justify-between items-center">
                <div className="flex gap-x-4 mb-5 md:mb-0 items-center">
                    <span className="bg-primary p-1 rounded-full text-white">
                        <ArrowBigLeftIcon
                            className='cursor-pointer'
                            onClick={() => router.back()} />
                    </span>
                    My Expenses
                </div>

                <div className="flex items-center gap-2">

                    <EditBudget budgetInfo={budgetInfo}
                        refreshData={() => getBudgetInfo()} />

                    <AlertDialog asChild>
                        <AlertDialogTrigger>
                            <div
                                className="
                                items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 flex gap-x-4
                                "><Trash /> Delete
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your current budget and associated expenses.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={deleteBudget}
                                >Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>

            </h2>
            <div className="mt-4 grid gap-4 grid-cols-1 lg:grid-cols-2">
                {
                    budgetInfo ? (<BudgetItem budget={budgetInfo} />
                    ) : (<div className="bg-gray-200 h-[170px] animate-pulse w-full rounded-lg"></div>)
                }
                <AddExpense budgetId={params.id} user={user}
                    refreshData={() => getBudgetInfo()} />
            </div>
            <div className="mt-4">

                <ExpenseListTable
                    expensesList={expensesList}
                    refreshData={() => getBudgetInfo()}
                />
            </div>
        </div>
    )
}

export default ExpenseDetails;