type JobExperience = {
    job_title: string,
    employment_type: string,
    company: string,
    is_current: boolean,
    start_date: {
        month: string,
        year: string
    },
    end_date?: {
        month: string,
        year: string
    }
}

export type { JobExperience };