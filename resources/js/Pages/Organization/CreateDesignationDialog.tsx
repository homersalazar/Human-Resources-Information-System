import useForm from "@/hooks/useForm";
import Swal from "sweetalert2";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/Components/ui/dialog";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import axios from "axios";

export default function CreateDesignationDialog() {
    const [isOpen, setIsOpen] = useState(false);

    const validate = (values: { [key: string]: any }) => {
        let errors: { name?: string } = {};
        if (!values.name) {
            errors.name = "Designation name is required";
        }
        return errors;
    };

    // Using the hook without generic type parameter
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        resetForm,
        setIsSubmitting,
    } = useForm({ name: "", description: "" }, validate);

    const onSubmit = async (values: { [key: string]: any }) => {
        setIsSubmitting(true);
        await axios
            .post("/designation", values)
            .then((response) => {
                setIsOpen(false);

                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: response.data.success,
                    showConfirmButton: false,
                    timer: 3000,
                });

                setTimeout(() => {
                    resetForm();
                    window.location.reload();
                }, 2000);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error,
                    showConfirmButton: false,
                    timer: 3000,
                }).then(() => {
                    resetForm();
                    setIsOpen(false);
                });
            });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Designation</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Designation</DialogTitle>
                    <DialogDescription>
                        Add a new designation to your organization.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
                    <div className="flex flex-col gap-4 w-full">
                        <div>
                            <label className="block text-sm font-medium">
                                Designation Name
                            </label>
                            <Input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Enter designation"
                                className="mt-1 w-full"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Designation Description
                            </label>
                            <Input
                                type="text"
                                name="description"
                                value={values.description || ""}
                                onChange={handleChange}
                                placeholder="Enter description"
                                className="mt-1 w-full"
                            />
                        </div>

                        <div className="mt-4">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
