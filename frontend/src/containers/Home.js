import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

import JobList from '../components/JobList'
import JobDetail from '../components/JobDetail'
import JobForm from '../components/JobForm'
import SkillsList from '../components/SkillsList'

import { Box, Button, Grid } from '@material-ui/core'

import * as urls from '../constants'

const Home = () => {
  const [state, setState] = useState({
    job: {
      title: '',
      description: '',
      skills: [],
    },
    jobs: [],
    selected: null,
  })

  const formRef = useRef(null)

  useEffect(() => {
    const getJobs = () => {
      axios.get(urls.jobAll).then((response) => {
        setState({ ...state, jobs: response.data })
      })
    }
    getJobs()
  }, [])

  const handleSubmit = async () => {
    const values = await formRef.current.submitForm()
    console.log('Values: ', values)
    const skills = await axios.post(urls.skillsCreate, {
      skills: values.skills,
    })
    console.log('Skills', skills)
    const job = await axios.post(urls.jobCreate, values)
    let jobs = state.jobs.concat(job.data.job)
    setState({ ...state, jobs })
    console.log('Job', job)
  }

  return (
    <React.Fragment>
      <Box p={4}>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item xs={7}>
            <Box p={5} border={1}>
              <JobForm job={state.job} formRef={formRef} />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Post Job{' '}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <JobDetail homeState={state} />
          </Grid>
          <Grid item xs={7}>
            <SkillsList />
          </Grid>
          <Grid item xs={7}>
            <JobList state={state} setState={setState} />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default Home
