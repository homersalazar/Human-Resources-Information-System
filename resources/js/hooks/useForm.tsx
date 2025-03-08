import { useState } from "react";

function useForm(initialValues: any, validate: (values: any) => any) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, files } = e.target;
        let value;

        // Handle file inputs differently
        if (type === "file") {
            value = files ? files[0] : null; // Store the actual file object
        } else if (type === "checkbox") {
            value = e.target.checked;
        } else {
            value = e.target.value;
        }

        setValues((prevValues: any) => ({
            ...prevValues,
            [name]: value,
        }));

        // Validate field on change
        if (validate) {
            const validationErrors = validate({
                ...values,
                [name]: value,
            });
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: validationErrors[name],
            }));
        }
    };

    // Handle input blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));

        // Validate on blur
        if (validate) {
            const validationErrors = validate({
                ...values,
                [name]: values[name],
            });
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: validationErrors[name],
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        onSubmit: (values: any) => Promise<void>
    ) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mark all fields as touched
        const touchedFields = Object.keys(values).reduce(
            (acc, key) => ({
                ...acc,
                [key]: true,
            }),
            {}
        );
        setTouched(touchedFields);

        // Run full validation
        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length > 0) {
                setIsSubmitting(false);
                return;
            }
        }

        try {
            // Call the onSubmit callback
            if (onSubmit) {
                await onSubmit(values);
            }
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form
    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    };

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setValues,
    };
}

export default useForm;
