import React, { useState, useEffect } from 'react'
import * as urls from '../constants'
import axios from 'axios'
import { Chip, Grid, Typography } from '@material-ui/core'

const JobDetail = ({ homeState }) => {
  const [state, setState] = useState(null)

  useEffect(() => {
    axios
      .get(urls.jobDetail(homeState.selected))
      .then((response) => setState(response.data))
  }, [homeState])

  const renderSkills = () => {
    if (state.skills) {
      return state.skills.map((skill) => (
        <Chip key={skill.pk} label={skill.title} />
      ))
    }
  }

  const renderDetail = () => {
    if (state === null) {
      return <Typography variant="body1">No data available</Typography>
    } else {
      return (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5">{state.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            {renderSkills()}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{state.description}</Typography>
          </Grid>
        </Grid>
      )
    }
  }

  return renderDetail()
}

export default JobDetail
