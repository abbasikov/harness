const BASE_URL = 'http://127.0.0.1:8000'

export const jobAll = `${BASE_URL}/api/jobs/`
export const jobCreate = `${BASE_URL}/api/jobs/create/`
export const jobDetail = (id) => `${BASE_URL}/api/jobs/detail/${id}`
export const mostUsedSkilss = `${BASE_URL}/api/skills/top/`
export const skillCreate = `${BASE_URL}/api/skills/create`
