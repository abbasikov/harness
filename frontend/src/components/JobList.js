import React, { useEffect, useState } from 'react'
import * as urls from '../constants'
import axios from 'axios'

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@material-ui/core'

const JobList = ({ homeState, setHomeState }) => {
  const [state, setState] = useState({
    jobs: [],
  })

  useEffect(() => {
    const getJobs = () => {
      axios.get(urls.jobAll).then((response) => {
        console.log('Response: ', response.data)
        setState({ jobs: response.data })
      })
    }
    getJobs()
  }, [])

  const renderJobs = () => {
    if (state.jobs.length > 0) {
      return state.jobs.map((job) => (
        <ListItem
          button
          onClick={() => setHomeState({ ...homeState, selected: job.pk })}
        >
          <ListItemText primary={job.title} />
        </ListItem>
      ))
    } else {
      return <Typography variant="body1">No jobs listed yet.</Typography>
    }
  }
  return (
    <Box border={1} p={4}>
      <Typography variant="h4">Job List</Typography>
      <List>{renderJobs()}</List>
    </Box>
  )
}

export default JobList
