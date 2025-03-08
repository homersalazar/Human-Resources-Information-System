import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

export default function CreateDesignationDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Designation</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Designation</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={submit}></form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
