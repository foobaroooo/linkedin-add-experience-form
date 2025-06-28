import { useForm } from "react-hook-form";
import type { JobExperience } from "../types";

function AddExperienceForm() {
    return (
        <div>
            <form className="p-4">
                <h2 className="text-2xl font-bold mb-4">Add Experience</h2>
                <div className="text-gray-500 text-sm mb-4">* Indicates required</div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="job_title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="job_title"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Ex: Retail Sales Manager"
                    />
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
                        Company
                    </label>
                    <input
                        type="text"
                        id="company"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Ex: TechCorp Inc."
                    />
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
                    <label className="block mb-2">Start Date</label>
                    <div className="flex space-x-2">
                        <select
                            id="start_month"
                            className="flex-1 p-2 border border-gray-300 rounded"
                        >
                            <option value="">Month</option>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            id="start_year"
                            className="flex-1 p-2 border border-gray-300 rounded"
                            placeholder="Year"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">End Date</label>
                    <div className="flex space-x-2">
                        <select id="end_month" className="flex-1 p-2 border border-gray-300 rounded">
                            <option value="">Month</option>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            id="end_year"
                            className="flex-1 p-2 border border-gray-300 rounded"
                            placeholder="Year"
                        />
                    </div>
                </div>
                <footer className="flex justify-end space-x-2 m-8">
                    <button 
                        type="button"
                        className="px-10 py-2 bg-blue-300 text-white-800 rounded-full hover:bg-blue-400"
                        onClick={() => {
                            // Handle cancel action
                        }}
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    )
}

export default AddExperienceForm