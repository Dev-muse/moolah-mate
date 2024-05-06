'use client';

import { Button } from '../../../../../components/ui/button';
import { PenBox } from 'lucide-react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import EmojiPicker from 'emoji-picker-react';
import { Input } from '../../../../../components/ui/input';
import { db } from '../../../../../utils/dbConfig';
import { budgets } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

const EditBudget = ({ budgetInfo, refreshData }) => {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo.icon)
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [budgetName, setBudgetName] = useState(budgetInfo?.name)
    const [budgetAmount, setBudgetAmount] = useState(budgetInfo?.amount)
    const { user } = useUser();





    // editing budget
    const updateBudget = async () => {

        const result = await db.update(budgets)
            .set({
                name: budgetName,
                amount: budgetAmount,
                icon: emojiIcon
            }).where(eq(budgets.id, budgetInfo.id)).returning()

        if (result) {
            refreshData()
            toast(`${budgetInfo.name} budget was updated!`)
        }
    }

    const handleEmojiClick = (event) => {
        setEmojiIcon(event.emoji)
        setOpenEmojiPicker(false)
    }



    useEffect(() => {
        if (budgetInfo) {
            setEmojiIcon(budgetInfo.icon)
            setBudgetName(budgetInfo.name)
            setBudgetAmount(budgetInfo.amount)

        }
        console.log('use effect', budgetInfo)
    }, [budgetInfo])


    return (
        <div>
            <Dialog >
                <DialogTrigger asChild>
                    <Button className='flex items-center gap-2'>
                        <PenBox /> Edit
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
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
                                        defaultValue={budgetInfo.name}
                                        placeholder='e.g renovation'
                                        onChange={(e) => setBudgetName(e.target.value)} />
                                </div>
                                <div className="my-5 space-y-2">
                                    <h2 className="text-gray-400">Amount</h2>
                                    <Input
                                        placeholder='e.g £1000'
                                        type='number'
                                        defaultValue={budgetInfo.amount}
                                        onChange={(e) => setBudgetAmount(e.target.value)} />
                                </div>


                            </div>

                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                className='w-full'
                                onClick={updateBudget}
                                disabled={!(budgetAmount && budgetName)}
                            >Update budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget