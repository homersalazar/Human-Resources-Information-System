import AppLayouts from "@/Layouts/AppLayouts";
import { Head } from "@inertiajs/react";

const Index = () => {
    const title = "Application tracker";
    return (
        <AppLayouts title={title}>
            <Head title={title} />
            {/* Content here */}
        </AppLayouts>
    );
};

export default Index;
