import AppLayouts from "@/Layouts/AppLayouts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { Head } from "@inertiajs/react";
import CreateDesignationDialog from "@/Pages/Organization/CreateDesignationDialog";

const Index = () => {
    const title = "Designation";
    return (
        <AppLayouts title={title}>
            <Head title={title} />
            <div className="flex flex-col gap-5 w-full  px-5">
                <div className="flex flex-row justify-between gap-5 w-full border-b pb-2">
                    <p className="mt-3 text-sm">Default Approver: test</p>
                    <CreateDesignationDialog />
                </div>
                <div className="flex flex-row gap-5 w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right"></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayouts>
    );
};

export default Index;
