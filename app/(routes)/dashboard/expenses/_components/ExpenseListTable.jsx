import { Trash } from 'lucide-react'
import React from 'react'
import { db } from '../../../../../utils/dbConfig';
import { Expenses } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../components/ui/table';

const ExpenseListTable = ({ expensesList, refreshData }) => {

    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expense.id)).returning()

        if (result) {
            toast(`${expense.name} expense was deleted!`)
            refreshData()
        }

    }
    return (
        <Table className="mt-3">
            <TableHeader >
                <TableRow>
                    <TableHead >Expense</TableHead>
                    <TableHead >Amount</TableHead>
                    <TableHead >Date</TableHead>
                    <TableHead >Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    expensesList.map((expense) => {
                        return (
                            <TableRow key={expense.id}  >
                                <TableCell>{expense.name}</TableCell>
                                <TableCell>£{expense.amount}</TableCell>
                                <TableCell>{expense.createdAt}</TableCell>
                                <TableCell>
                                    <Trash className='text-red-600 cursor-pointer'
                                        onClick={() => deleteExpense(expense)} />
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export default ExpenseListTable