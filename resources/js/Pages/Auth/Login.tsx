import InputError from "@/Components/InputError";
import GuestLayout from "@/Layouts/GuestLayout";

import { useEffect, FormEventHandler } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="grid min-h-svh lg:grid-cols-2  w-full">
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
                            Don&apos;t have an account?
                            <a
                                href="/Signup"
                                className="underline underline-offset-4"
                            >
                                Sign up
                            </a>
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <div className="flex flex-1 items-center justify-center">
                            <div className="w-full max-w-xs">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <h1 className="text-2xl font-bold">
                                            Sign In
                                        </h1>
                                        <p className="text-balance text-sm text-muted-foreground">
                                            Sign in using your account with
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <FaGoogle />
                                        Google
                                    </Button>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                placeholder="Email address"
                                                autoComplete="username"
                                                value={data.email}
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
                                        <div className="grid gap-2">
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full"
                                                autoComplete="current-password"
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
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={processing}
                                        >
                                            Login
                                        </Button>
                                        <div className="flex items-center">
                                            <a
                                                href="#"
                                                className="ml-auto text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-2 text-sm md:hidden block">
                            Don&apos;t have an account?
                            <a
                                href="/Signup"
                                className="underline underline-offset-4"
                            >
                                Sign up
                            </a>
                        </div>
                    </form>
                </div>
                <div className="relative hidden bg-muted lg:block">
                    <img
                        src="https://placehold.co/600x400"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </GuestLayout>
    );
}
