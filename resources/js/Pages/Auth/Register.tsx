import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";

import { Head, useForm } from "@inertiajs/react";
import { useEffect, FormEventHandler } from "react";
import { Input } from "@/Components/ui/input";
import { GalleryVerticalEnd } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { FaGoogle } from "react-icons/fa";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Post the form data to the register route
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="grid min-h-svh lg:grid-cols-2 w-full">
                <div className="relative hidden bg-muted lg:block">
                    <img
                        src="https://placehold.co/600x400"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-between">
                        <a
                            href="#"
                            className="flex items-center gap-2 font-medium"
                        >
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                <GalleryVerticalEnd className="size-4" />
                            </div>
                            Company Name
                        </a>
                        <div className="text-center text-sm md:block hidden">
                            Already a member?
                            <a
                                href="/"
                                className="underline underline-offset-4"
                            >
                                Log in.
                            </a>
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <div className="flex flex-1 items-center justify-center">
                            <div className="w-full max-w-xs">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <h1 className="text-2xl font-bold">
                                            Sign Up
                                        </h1>
                                        <p className="text-balance text-sm text-muted-foreground">
                                            Sign up with an already existing
                                            account
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <FaGoogle />
                                        Google
                                    </Button>
                                    <p className="text-balance text-sm text-muted-foreground">
                                        Or sign up with your email address
                                    </p>
                                    <div className="grid gap-4">
                                        <div className="grid">
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                placeholder="Name"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="grid">
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={data.email}
                                                className="mt-1 block w-full"
                                                autoComplete="email"
                                                placeholder="Email"
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="grid">
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={data.password}
                                                className="mt-1 block w-full"
                                                autoComplete="password"
                                                placeholder="Password"
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.password}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="grid">
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                className="mt-1 block w-full"
                                                autoComplete="password_confirmation"
                                                placeholder="Repeat password"
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={processing}
                                        >
                                            Create an account
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-2 text-sm md:hidden block">
                            Already a member?
                            <a
                                href="/"
                                className="underline underline-offset-4"
                            >
                                Log in.
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
