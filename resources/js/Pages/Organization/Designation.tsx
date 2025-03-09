import CreateDesignationDialog from "@/Pages/Organization/CreateDesignationDialog";
import DataTable from "react-data-table-component";
import AppLayouts from "@/Layouts/AppLayouts";
import Swal from "sweetalert2";
import axios from "axios";

import { usePage, router, Head } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

type DesignationData = {
    id: Number;
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

    const handleEdit = (row: DesignationData) => {};

    const handleDelete = async (id: Number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/designation/${id}`).then((response) => {
                    const message = response.data.success;
                    Swal.fire({
                        title: "Deleted!",
                        text: message,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000, // Wait before refreshing
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                });
            } catch (error) {
                console.error("Error deleting designation:", error);
                Swal.fire(
                    "Error!",
                    "There was an error deleting the designation.",
                    "error"
                );
            }
        }
    };

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
        {
            name: "",
            cell: (row: DesignationData) => (
                <div className="flex space-x-2">
                    <>
                        <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEdit(row)}
                        >
                            <Pencil size={16} />
                        </button>
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(row.id)}
                        >
                            <Trash2 size={16} />
                        </button>
                    </>
                </div>
            ),
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
