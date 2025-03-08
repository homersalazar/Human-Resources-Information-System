import * as React from "react";
import {
    LayoutDashboardIcon,
    UserRoundSearch,
    UsersRound,
    Settings2,
    Building2,
} from "lucide-react";

import { NavMain } from "@/Components/nav-main";
import { NavUser } from "@/Components/nav-user";
import { TeamSwitcher } from "@/Components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/Components/ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboardIcon,
        },

        {
            title: "Application tracker",
            url: "/application",
            icon: UserRoundSearch,
        },

        {
            title: "People",
            url: "/people",
            icon: UsersRound,
        },

        {
            title: "Organization",
            url: "#",
            icon: Building2,
            items: [
                {
                    title: "Department",
                    url: "/department",
                },
                {
                    title: "Designation",
                    url: "/designation",
                },
                {
                    title: "Contract",
                    url: "#",
                },
                {
                    title: "Company",
                    url: "#",
                },
            ],
        },

        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Activity Log",
                    url: "#",
                },
                {
                    title: "Permission",
                    url: "#",
                },
                {
                    title: "Role",
                    url: "#",
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
