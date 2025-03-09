import { useState } from "react";
import CreateDesignationDialog from "@/Pages/Organization/CreateDesignationDialog";
import DataTable from "react-data-table-component";

import AppLayouts from "@/Layouts/AppLayouts";
import { usePage, router, Head } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";

type DesignationData = {
    position: string;
    description: string;
};

type Pagination<T> = {
    data: T[];
    total: number;
    per_page: number;
};

const Designation = () => {
    const title = "Designation";
    const { designations } = usePage<{
        designations: Pagination<DesignationData>;
    }>().props;

    const [searchTerm, setSearchTerm] = useState("");

    const filterDesignation = (designations.data || []).filter((row) => {
        return (
            (row.position?.toLowerCase() || "").includes(
                searchTerm.toLowerCase()
            ) ||
            (row.description?.toLowerCase() || "").includes(
                searchTerm.toLowerCase()
            )
        );
    });

    const columns = [
        {
            name: "Name",
            selector: (row: DesignationData) => row.position,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row: DesignationData) => row.description,
            sortable: true,
        },
    ];

    // Handle page change
    const handlePageChange = (page: number) => {
        router.get(
            route("designations.index"),
            { page },
            { preserveScroll: true }
        );
    };

    return (
        <AppLayouts title={title}>
            <Head title={title} />
            <div className="flex flex-col gap-5 w-full px-5">
                <div className="flex flex-row justify-between gap-5 w-full border-b pb-2">
                    <p className="mt-3 text-sm">Default Approver: test</p>
                    <CreateDesignationDialog />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-end w-full">
                        <div className="flex flex-row gap-2">
                            <p className="mt-2">Search</p>
                            <Input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={filterDesignation}
                        pagination
                        paginationServer
                        responsive
                        highlightOnHover
                        pointerOnHover
                        paginationTotalRows={designations.total}
                        paginationPerPage={designations.per_page}
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        paginationRowsPerPageOptions={[5, 10, 15, 20]}
                        onChangePage={handlePageChange}
                    />
                </div>
            </div>
        </AppLayouts>
    );
};

export default Designation;
