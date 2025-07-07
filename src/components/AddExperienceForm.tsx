import { useForm } from "react-hook-form";
import type { JobExperience } from "../types";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from "zod";

const JobSchema= z.object({ 
    job_title: z.string().min(1, "Title is required"),
    company: z.string().min(1, "Company is required"),
    employment_type: z.string(),
    is_current: z.boolean().optional(),
    start_date: z.object({
        month: z.string(),
        year: z.string()
    })
    .required()
    .refine(
        (data) => data.month && data.year,
        { message: "Start date is required" }
    )
});

const CurrentJobSchema = JobSchema.extend({
    is_current: z.literal(true)
});

const PastJobSchema = JobSchema.merge(
    z.object({
        is_current: z.literal(false),
        end_date: z.object({
            month: z.string(),
            year: z.string()
        })
        .required()
        .refine(
            (data) => data.month && data.year,
            { message: "End date is required" }
        )
    })
);

const JobExperienceSchema: ZodType<JobExperience> = z.union([
    CurrentJobSchema,
    PastJobSchema
]);

//  Corina: It's common practice to type the schema and the `useForm` hook
type JobExperienceSchemaType = z.infer<typeof JobExperienceSchema>;

type JobExperienceFormProps = {
    onSubmit: (data: JobExperience) => void;
    onCancel: () => void;
};

const YEAR_OPTIONS = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
).map((year) => year.toString());

function AddExperienceForm({ onSubmit, onCancel } : JobExperienceFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<JobExperienceSchemaType>({
        resolver: zodResolver(JobExperienceSchema),
    });

    return (
        <div>
            <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold mb-4">Add Experience</h2>
                <div className="text-gray-500 text-sm mb-4">* Indicates required</div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="job_title">
                        Title *
                    </label>
                    <input
                        type="text"
                        id="job_title"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Ex: Retail Sales Manager"
                        {...register('job_title')} />
                    {errors.job_title && <span className={errors.job_title ? "text-red-500 text-sm" : ""}>{"⛔ " + errors.job_title.message}</span>}                    
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="employment_type">
                        Employment Type
                    </label>
                    <select
                        id="employment_type"
                        className="w-full p-2 border border-gray-300 rounded"
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
                        id="company"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Ex: TechCorp Inc."
                        {...register('company')} />
                    {errors.company && <span className={errors.company ? "text-red-500 text-sm" : ""}>{"⛔ " + errors.company.message}</span>}      
                </div>
                <div className="mb-4">
                    <label className="block mb-2">
                        <input
                        type="checkbox"
                        id="is_current"
                        className="mr-2"
                        />
                        Is this your current job?
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Start Date *</label>
                    <div className="flex space-x-2">
                        <select
                            id="start_month"
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
                            id="start_year"
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
                            {"⛔ " + errors.start_date.message}
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">End Date *</label>
                    <div className="flex space-x-2">
                        <select 
                            id="end_month" 
                            className="flex-1 p-2 border border-gray-300 rounded"
                            {...register('end_date.month')}
                        >
                            <option value="">Month</option>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select
                            id="end_year"
                            className="flex-1 p-2 border border-gray-300 rounded"
                            {...register('end_date.year')}
                        >
                            {YEAR_OPTIONS.map((year) => (
                                <option key={year} value={year}>
                                {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.end_date && (
                        <span className="text-red-500 text-sm">
                            {"⛔ " + errors.end_date.message}
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
        </div>
    )
}

export default AddExperienceForm