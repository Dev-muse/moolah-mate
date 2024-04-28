'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';



const CreateBudget = ({ refreshData }) => {

    const [emojiIcon, setEmojiIcon] = useState('👇')
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [budgetName, setBudgetName] = useState('')
    const [budgetAmount, setBudgetAmount] = useState(null)
    const { user } = useUser();
    const createBudget = async () => {
        const result = await db.insert(budgets).values({
            name: budgetName,
            amount: budgetAmount,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            icon: emojiIcon,
        }).returning({ insertedId: budgets.id })

        if (result) {
            refreshData()
            toast('Your budget has been created');
        }

        setBudgetAmount(null)
        setBudgetName('')
        setEmojiIcon('😀')
    }

    const handleEmojiClick = (event) => {
        setEmojiIcon(event.emoji)
        setOpenEmojiPicker(false)
    }
    return (
        <div className=''>

            <Dialog >
                <DialogTrigger asChild>
                    <div className="p-10 bg-slate-100
            border-primary border-dashed border-2 
            rounded-md hover:shadow-md 
            flex flex-col items-center gap-4">
                        <h2 className="text-4xl">+</h2>
                        <h2 className="text-xl">Create Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            <div className="mt-5">
                                <div className="">
                                    <Button
                                        size='lg'
                                        variant='outline'
                                        onClick={() =>
                                            setOpenEmojiPicker(!openEmojiPicker)}>
                                        {emojiIcon}
                                    </Button>
                                    <div className="absolute z-10">
                                        <EmojiPicker open={openEmojiPicker}
                                            onEmojiClick={handleEmojiClick}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 space-y-2">
                                    <h2 className="text-gray-400">Name</h2>
                                    <Input type="text"
                                        placeholder='e.g renovation'
                                        onChange={(e) => setBudgetName(e.target.value)} />
                                </div>
                                <div className="my-5 space-y-2">
                                    <h2 className="text-gray-400">Amount</h2>
                                    <Input
                                        placeholder='e.g £1000'
                                        type='number'
                                        onChange={(e) => setBudgetAmount(e.target.value)} />
                                </div>


                            </div>

                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                className='w-full'
                                onClick={createBudget}
                                disabled={!(budgetAmount && budgetName)}
                            >Create budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div >
    )
}

export default CreateBudget