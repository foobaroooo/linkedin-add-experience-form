import { useForm } from "react-hook-form";
import type { JobExperience, PastJob } from "../types";
import type { FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useEffect } from "react";

const JobSchema = z.object({
    job_title: z.string().min(1, { message: "⛔️ Title is a required field" }),
    employment_type: z.string(),
    company: z.string().min(1, {
        message: "⛔️ Company is a required field",
    }),
    start_date: z.object({
        month: z.string(),
        year: z.string(),
    })
    .required()
    .refine((data) => data.month && data.year, {
        message: "⛔️ Start date is a required field",
    }),
});

const CurrentJobSchema = JobSchema.extend({
    is_current: z.literal(true),
});

const PastJobSchema = JobSchema.merge(
    z.object({
        is_current: z.literal(false),
        end_date: z.object({
            month: z.string(),
            year: z.string(),
        })
        .required()
        .refine((data) => data.month && data.year, {
            message: "⛔️ Start and end dates are required",
        }),
    })
).refine(
    (data) => {
        const startDate = new Date(
            parseInt(data.start_date.year),
            parseInt(data.start_date.month)
        );
        const endDate = new Date(
            parseInt(data.end_date.year),
            parseInt(data.end_date.month)
        );

        return endDate > startDate;
    },
    {
        message: "⛔️ End date can’t be earlier than start date",
        path: ["end_date"],
    }
);

const JobExperienceSchema: ZodType<JobExperience> = z.union([
    CurrentJobSchema,
    PastJobSchema,
]);

type JobExperienceFormProps = {
    onSubmit: (data: JobExperience) => void;
    onCancel: () => void;
};

const YEAR_OPTIONS = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
).map((year) => year.toString());


function AddExperienceForm({ onSubmit, onCancel } : JobExperienceFormProps) {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<JobExperience>({
        resolver: zodResolver(JobExperienceSchema),
    });

    const isCurrent = watch("is_current");
    useEffect(() => {
        if (isCurrent === true) {
            setValue("end_date.month", "");
            setValue("end_date.year", "");
        }
    }, [isCurrent, setValue]);


    return (
        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
            <header className="flex justify-between items-center p-4 border-b-1 border-gray-300">
                <h2 className="text-2xl font-bold">Add Experience</h2>
                <button
                    type="button"
                    onClick={onCancel}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-2xl"
                >
                    X
                </button>
            </header>
            <div className="text-gray-500 text-sm mb-4">* Indicates required</div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="job_title">
                    Title *
                </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Ex: Retail Sales Manager"
                    {...register('job_title')} />
                {errors.job_title && <span className={errors.job_title ? "text-red-500 text-sm" : ""}>{errors.job_title.message}</span>}                    
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="employment_type">
                    Employment Type
                </label>
                <select
                    className="w-full p-2 border border-gray-300 rounded"
                    {...register("employment_type")}
                >
                    <option value="">Select employment type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="company">
                    Company *
                </label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Ex: TechCorp Inc."
                    {...register('company')} />
                {errors.company && <span className={errors.company ? "text-red-500 text-sm" : ""}>{errors.company.message}</span>}      
            </div>
            <div className="mb-4">
                <label className="block mb-2">
                    <input
                    type="checkbox"
                    className="mr-2"
                    {...register("is_current")}
                    />
                    Is this your current job?
                </label>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Start Date *</label>
                <div className="flex space-x-2">
                    <select
                        className="flex-1 p-2 border border-gray-300 rounded"
                        {...register('start_date.month')}
                    >
                        <option value="">Month</option>
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <select
                        className="flex-1 p-2 border border-gray-300 rounded"
                        {...register('start_date.year')}
                    >
                        {YEAR_OPTIONS.map((year) => (
                            <option key={year} value={year}>
                            {year}
                            </option>
                        ))}
                    </select>
                </div>
                {errors.start_date && (
                    <span className="text-red-500 text-sm">
                        {errors.start_date.message}
                    </span>
                )}
            </div>
            <div className="mb-4">
                <label className="block mb-2">End Date *</label>
                <div className="flex space-x-2">
                    <select 
                        className="flex-1 p-2 border border-gray-300 rounded"
                        {...register('end_date.month')}
                        disabled={isCurrent}
                    >
                        <option value="">Month</option>
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <select
                        className="flex-1 p-2 border border-gray-300 rounded"
                        {...register('end_date.year')}
                        disabled={isCurrent}
                    >
                        {YEAR_OPTIONS.map((year) => (
                            <option key={year} value={year}>
                            {year}
                            </option>
                        ))}
                    </select>
                </div>
                {(errors as FieldErrors<PastJob>).end_date && (
                    <span className="text-red-400">
                        {(errors as FieldErrors<PastJob>).end_date?.message}
                    </span>
                )}
            </div>
            <footer className="flex justify-end space-x-2 m-8">
                <button 
                    type="button"
                    className="cursor-pointer px-10 py-2 bg-gray-300 text-white-800 rounded-full hover:bg-gray-400"
                    onClick={() => {
                        // Handle cancel action
                        onCancel()
                    }}
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    className="cursor-pointer px-10 py-2 bg-blue-300 text-white-800 rounded-full hover:bg-blue-400"
                >
                    Save
                </button>
            </footer>
        </form>
    )
}

export default AddExperienceForm