import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

import JobList from '../components/JobList'
import JobDetail from '../components/JobDetail'
import JobForm from '../components/JobForm'
import SkillsList from '../components/SkillsList'

import { Box, Button, Grid, Typography } from '@material-ui/core'

import * as urls from '../constants'

const Home = () => {
  const [state, setState] = useState({
    job: {
      title: '',
      description: '',
      skills: [''],
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
    let values
    try {
      values = await formRef.current.submitForm()
    } catch (error) {
      console.log('Error: ', error)
      return
    }
    try {
      const skills = await axios.post(urls.skillsCreate, {
        skills: values.skills,
      })
    } catch (error) {
      console.log('Error in skill creation: ', error)
      return
    }
    try {
      const job = await axios.post(urls.jobCreate, values)
      let jobs = state.jobs.concat(job.data.job)
      setState({ ...state, jobs })
    } catch (error) {
      console.log('Error in job creation: ', error)
    }
  }

  return (
    <Box p={5}>
      <Grid container spacing={3}>
        <Grid container item xs={6} spacing={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <Box p={5} border={1}>
              <Typography variant="h4">Most Used Skills</Typography>
              <SkillsList />
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={6}
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Box p={5} border={1}>
              <Typography variant="h4"> Job Detail </Typography>
              <JobDetail homeState={state} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box p={5} border={1}>
              <Typography variant="h4">Job List</Typography>
              <JobList state={state} setState={setState} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
