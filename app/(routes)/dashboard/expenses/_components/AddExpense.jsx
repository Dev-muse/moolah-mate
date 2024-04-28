'use client';
import React, { useState } from 'react'
import { Input } from '../../../../../components/ui/input'
import { Button } from '../../../../../components/ui/button';
import { db } from '../../../../../utils/dbConfig';
import { budgets, Expenses } from '../../../../../utils/schema';
import { date } from 'drizzle-orm/pg-core';
import { toast } from 'sonner';

const AddExpense = ({ budgetId, user, refreshData }) => {

    const [budgetName, setBudgetName] = useState()
    const [budgetAmount, setBudgetAmount] = useState()

    const addNewExpense = async () => {
        const result = await db.insert(Expenses).values({
            name: budgetName,
            amount: budgetAmount,
            budgetId: budgetId,
            createdAt: user?.primaryEmailAddress.emailAddress,
        }).returning({ insertedId: budgets.id })

        console.log('result add expense', result)
        if (result) {
            toast('New expense added!')
            refreshData()
            setBudgetAmount(0)
            setBudgetName('')
        }
    }
    return (
        <div className='p-5 rounded-lg border-2  border-primary'>
            <div className="font-bold text-lg">Add Expense</div>
            <div className="mt-5 space-y-2">
                <h2 className="text-gray-400">Name</h2>
                <Input type="text"
                    value={budgetName}
                    placeholder='e.g renovation'
                    onChange={(e) => setBudgetName(e.target.value)} />
            </div>
            <div className="my-5 space-y-2">
                <h2 className="text-gray-400">Amount</h2>
                <Input
                    placeholder='e.g £1000'
                    type='number'
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)} />
            </div>
            <Button disabled={!(budgetAmount && budgetName)}
                onClick={() => addNewExpense()}
                className="mt-4 w-full">Add New Expense</Button>
        </div>
    )
}

export default AddExpense