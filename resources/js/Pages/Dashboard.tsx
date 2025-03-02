import { AppSidebar } from "@/Components/app-sidebar";
import { Separator } from "@/Components/ui/separator";
import { Head } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import { Bell, Mail, MoreVertical, Star } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";
import { Button } from "@/Components/ui/button";

const chartData = [
    { department: "finance", employees: 6, fill: "hsl(220, 90%, 60%)" },
    { department: "hr", employees: 4, fill: "hsl(220, 90%, 60%)" },
    { department: "it", employees: 5, fill: "hsl(220, 90%, 60%)" },
    { department: "marketing", employees: 3, fill: "hsl(220, 90%, 60%)" },
    { department: "design", employees: 8, fill: "hsl(220, 90%, 60%)" },
    { department: "management", employees: 4, fill: "hsl(220, 90%, 60%)" },
];

const chartConfig = {
    employees: {
        label: "employees",
    },
    finance: {
        label: "Finance",
        color: "hsl(220, 90%, 60%)",
    },
    hr: {
        label: "HR",
        color: "hsl(220, 90%, 60%)",
    },
    it: {
        label: "IT",
        color: "hsl(220, 90%, 60%)",
    },
    marketing: {
        label: "Marketing",
        color: "hsl(220, 90%, 60%)",
    },
    design: {
        label: "Design",
        color: "hsl(220, 90%, 60%)",
    },
    management: {
        label: "Management",
        color: "hsl(220, 90%, 60%)",
    },
} satisfies ChartConfig;

const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
});

const announcements = [
    {
        id: 1,
        title: "Outing schedule for every department",
        date: "Monday, December 18, 2023",
        timeAgo: "5 minutes ago",
    },
    {
        id: 2,
        title: "Meeting Design Department",
        date: "Monday, December 18, 2023",
        timeAgo: "5 minutes ago",
    },
    {
        id: 3,
        title: "Outing schedule for every department",
        date: "Monday, December 18, 2023",
        timeAgo: "5 minutes ago",
    },
    {
        id: 4,
        title: "Meeting HR Department",
        date: "Monday, December 18, 2023",
        timeAgo: "5 minutes ago",
    },
];

export default function Page() {
    return (
        <SidebarProvider>
            <Head title="Dashboard" />

            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                    </div>
                    <div className="flex flex-row justify-end gap-3 w-full px-5">
                        <Mail />
                        <Bell />
                    </div>
                </header>
                <div className="grid grid-cols-[60%_40%] gap-4 w-full px-5">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <Card className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                            {/* Header with title and refresh icon */}
                            <CardHeader className="p-0 flex items-start justify-between">
                                <CardTitle className="text-lg font-semibold text-gray-900">
                                    Absence rate
                                </CardTitle>
                            </CardHeader>

                            {/* Main content (percentage) */}
                            <CardContent className="p-0 text-3xl font-bold text-blue-600">
                                9%
                            </CardContent>

                            {/* Footer text */}
                            <CardFooter className="p-0 text-sm text-gray-500">
                                vs. Previous month
                            </CardFooter>
                        </Card>

                        <Card className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                            {/* Header with title and refresh icon */}
                            <CardHeader className="p-0 flex items-start justify-between">
                                <CardTitle className="text-lg font-semibold text-gray-900">
                                    Absence cost
                                </CardTitle>
                            </CardHeader>

                            {/* Main content (percentage) */}
                            <CardContent className="p-0 text-3xl font-bold text-blue-600">
                                &#8369; 3,000
                            </CardContent>

                            {/* Footer text */}
                            <CardFooter className="p-0 text-sm text-gray-500">
                                vs. Previous month
                            </CardFooter>
                        </Card>

                        <Card className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                            {/* Header with title and refresh icon */}
                            <CardHeader className="p-0 flex items-start justify-between">
                                <CardTitle className="text-lg font-semibold text-gray-900">
                                    Unplanned absence
                                </CardTitle>
                            </CardHeader>

                            {/* Main content (percentage) */}
                            <CardContent className="p-0 text-3xl font-bold text-blue-600">
                                12 days
                            </CardContent>

                            {/* Footer text */}
                            <CardFooter className="p-0 text-sm text-gray-500">
                                vs. Previous month
                            </CardFooter>
                        </Card>

                        <div className="md:col-span-3">
                            <Card className="w-full">
                                <CardHeader className="pb-2">
                                    <CardTitle>
                                        Employees by department
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0 pb-2">
                                    <ChartContainer config={chartConfig}>
                                        <BarChart
                                            accessibilityLayer
                                            data={chartData}
                                        >
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="department"
                                                tickLine={false}
                                                tickMargin={10}
                                                axisLine={false}
                                                tickFormatter={(value) =>
                                                    chartConfig[
                                                        value as keyof typeof chartConfig
                                                    ]?.label
                                                }
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={
                                                    <ChartTooltipContent
                                                        hideLabel
                                                    />
                                                }
                                            />
                                            <Bar
                                                dataKey="employees"
                                                strokeWidth={2}
                                                radius={8}
                                                barSize={40}
                                                activeBar={({ ...props }) => {
                                                    return (
                                                        <Rectangle
                                                            {...props}
                                                            fillOpacity={0.8}
                                                            stroke={
                                                                props.payload
                                                                    .fill
                                                            }
                                                            strokeDasharray={4}
                                                            strokeDashoffset={4}
                                                        />
                                                    );
                                                }}
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <Card className="w-full max-w-md shadow-sm">
                        <CardHeader className="pb-2 flex flex-row justify-between items-center">
                            <div>
                                <CardTitle className="text-lg font-medium">
                                    Announcements
                                </CardTitle>
                                <p className="text-sm text-gray-500">
                                    2 active tasks
                                </p>
                            </div>
                            <p className="bg-blue-100 text-blue-800 hover:bg-blue-100 p-1 rounded-sm">
                                {currentDate}
                            </p>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="space-y-2">
                                {announcements.map((announcement) => (
                                    <div
                                        key={announcement.id}
                                        className="border border-gray-200 rounded-md p-3"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="text-xs text-gray-500">
                                                {announcement.timeAgo}
                                            </div>
                                            <div className="flex space-x-1">
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <Star size={16} />
                                                </button>
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-1 font-medium">
                                            {announcement.title}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {announcement.date}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <Button
                                variant="ghost"
                                className="text-blue-500 hover:text-blue-700 w-full justify-center text-sm p-1"
                            >
                                See all announcements
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
