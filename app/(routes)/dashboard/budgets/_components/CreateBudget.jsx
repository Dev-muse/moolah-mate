'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'


const CreateBudget = () => {
    return (
        <div>

            <Dialog>
                <DialogTrigger>
                    <div className="p-10 bg-slate-100
            border-primary border-dashed border-2 rounded-md hover:shadow-md 
            flex flex-col items-center gap-4">
                        <h2 className="text-4xl">+</h2>
                        <h2 className="text-xl">Create Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            <div className="">
                                <EmojiPicker />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateBudget