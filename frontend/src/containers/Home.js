import React, { useState, useRef, useEffect } from 'react'

import JobList from '../components/JobList'
import JobDetail from '../components/JobDetail'
import JobForm from '../components/JobForm'
import SkillsList from '../components/SkillsList'

import { Box, Grid } from '@material-ui/core'

const Home = () => {
  const [state, setState] = useState({
    job: {
      title: '',
      description: '',
      skills: [],
    },
    selected: null,
  })
  useEffect(() => {
    console.log(state)
  })
  const formRef = useRef(null)
  return (
    <React.Fragment>
      <Box p={4}>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item xs={7}>
            <JobForm job={state.job} formRef={formRef} />
          </Grid>
          <Grid item xs={7}>
            <JobDetail homeState={state} />
          </Grid>
          <Grid item xs={7}>
            <SkillsList />
          </Grid>
          <Grid item xs={7}>
            <JobList homeState={state} setHomeState={setState} />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default Home
