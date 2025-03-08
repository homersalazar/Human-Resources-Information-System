import AppLayouts from "@/Layouts/AppLayouts";
import $ from "jquery";
import "jstree";
import "jstree/dist/themes/default/style.css";
import Swal from "sweetalert2";

import { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/Components/ui/pagination";

const sanitizeLabel = (label: string) =>
    label.replace(/&laquo;|&raquo;/g, "").trim();

interface data {
    id: number;
    text: string;
    parent_id: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
}

const Department = () => {
    const { formattedData } = usePage<{ formattedData: data[] }>().props;
    const { users } = usePage<{ users: { data: User[]; links: any } }>().props;

    const title = "Department";

    useEffect(() => {
        $("#department_tree").jstree({
            core: { data: formattedData },
            plugins: ["state", "sort", "unique", "contextmenu"],
            contextmenu: {
                items: function (node: any) {
                    return {
                        create: {
                            label: "Create",
                            action: function () {
                                Swal.fire("Create clicked");
                            },
                        },
                        rename: {
                            label: "Rename",
                            action: function () {
                                Swal.fire("Rename clicked");
                            },
                        },
                        approver: {
                            label: "Department Approver",
                            action: function () {
                                Swal.fire("Approver clicked");
                            },
                        },
                        delete: {
                            label: "Delete",
                            action: function () {
                                Swal.fire("Delete clicked");
                            },
                        },
                    };
                },
            },
        });
    }, [formattedData]);

    return (
        <AppLayouts title={title}>
            <Head title={title} />
            <div className="flex flex-row gap-10 w-full px-5">
                <div id="department_tree" className="text-sm"></div>
                <div className="flex flex-col gap-5 w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Approver</TableHead>
                                <TableHead className="text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="flex flex-row gap-3">
                                        <Avatar>
                                            <AvatarImage src={user.avatarUrl} />
                                            <AvatarFallback>
                                                {user.name
                                                    .split(" ")
                                                    .map((word) =>
                                                        word.charAt(0)
                                                    )
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <h1>{user.name}</h1>
                                            <p className="text-xs text-gray-500">
                                                Junior Developer
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Approver</TableCell>
                                    <TableCell className="text-right">
                                        Action
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-end mt-4">
                        <Pagination>
                            <PaginationContent>
                                {users.links.map((link: any, index: number) => (
                                    <PaginationItem key={index}>
                                        {link.url ? (
                                            link.label === "Previous" ? (
                                                <PaginationPrevious
                                                    href={link.url}
                                                />
                                            ) : link.label === "Next" ? (
                                                <PaginationNext
                                                    href={link.url}
                                                />
                                            ) : link.label === "..." ? (
                                                <PaginationEllipsis />
                                            ) : (
                                                <PaginationLink
                                                    href={link.url}
                                                    isActive={link.active}
                                                >
                                                    {link.label}
                                                </PaginationLink>
                                            )
                                        ) : (
                                            <span className="px-3 py-1 border rounded bg-gray-200 text-gray-500 cursor-not-allowed">
                                                {sanitizeLabel(link.label)}
                                            </span>
                                        )}
                                    </PaginationItem>
                                ))}
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>
        </AppLayouts>
    );
};

export default Department;
