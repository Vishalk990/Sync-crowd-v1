import { LayoutDashboard, Database, Tags, Users, FileSpreadsheet, LineChart, Sparkles } from "lucide-react";

export const sidebarLinks = [
    {
        label: 'Dashboard',
        route: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        label: 'Synthetic Dataset',
        route: '/synthetic-data',
        icon: Database,
    },
    {
        label: 'Data Labelling',
        route: '/data-labelling',
        icon: Tags,
    },
    {
        label: 'CrowdSource',
        route: '/crowd-source',
        icon: Users,
    },
    {
        label: 'Data Cleaning',
        route: '/data-cleaning',
        icon: FileSpreadsheet,
    },
    {
        label: 'Model Evaluation',
        route: '/model-evaluation',
        icon: LineChart,
    },
    {
        label: 'Assistance',
        route: '/assistance',
        icon: Sparkles,
    },
];

