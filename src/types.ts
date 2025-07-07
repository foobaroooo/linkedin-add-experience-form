type Job = {
    job_title: string,
    employment_type: string,
    company: string,
    is_current: boolean,
    start_date: {
        month: string,
        year: string
    }
}

type CurrentJob = Job & {
    is_current: true
}

type PastJob = Job & {
    is_current: false,
    end_date: {
        month: string,
        year: string
    }
}

export type JobExperience = CurrentJob | PastJob;