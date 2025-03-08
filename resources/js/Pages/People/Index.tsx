import AppLayouts from "@/Layouts/AppLayouts";
import { Head, usePage } from "@inertiajs/react";

import { Table, TableBody, TableCell, TableRow } from "@/Components/ui/table";
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

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

const sanitizeLabel = (label: string) =>
    label.replace(/&laquo;|&raquo;/g, "").trim();

interface User {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
}

const Index = () => {
    const { users } = usePage<{ users: { data: User[]; links: any } }>().props;

    const title = "People";
    return (
        <AppLayouts title={title}>
            <Head title={title} />
            <div className="flex flex-col gap-5 w-full px-5">
                <div className="flex flex-row gap-5 max-w-xl">
                    <Card className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200 w-full">
                        <CardHeader className="p-0 flex items-start justify-between">
                            <CardTitle className="font-semibold text-gray-900">
                                Total Employees
                            </CardTitle>
                        </CardHeader>

                        {/* Main content (percentage) */}
                        <CardContent className="p-0 font-bold text-blue-600">
                            &#8369; 3,000
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200 w-full">
                        <CardHeader className="p-0 flex items-start justify-between">
                            <CardTitle className="font-semibold text-gray-900">
                                On Leave Today
                            </CardTitle>
                        </CardHeader>

                        {/* Main content (percentage) */}
                        <CardContent className="p-0 font-bold text-blue-600">
                            &#8369; 3,000
                        </CardContent>
                    </Card>
                </div>

                <Table>
                    <TableBody>
                        {users.data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="flex flex-row gap-3">
                                    <Avatar>
                                        <AvatarImage src={user.avatarUrl} />
                                        <AvatarFallback>
                                            {user.name
                                                .split(" ")
                                                .map((word) => word.charAt(0))
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
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <p>Contract</p>
                                        <p>Status</p>
                                    </div>
                                </TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell className="text-right">
                                    $250.00
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
                                            <PaginationNext href={link.url} />
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
        </AppLayouts>
    );
};

export default Index;
