import React from 'react'

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from '@material-ui/core'

const JobList = ({ state, setState }) => {
  const renderJobs = () => {
    if (state.jobs.length > 0) {
      return state.jobs.map((job) => (
        <React.Fragment>
          <ListItem
            button
            onClick={() => setState({ ...state, selected: job.pk })}
            key={job.pk}
          >
            <ListItemText primary={job.title} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))
    } else {
      return <Typography variant="body1">No jobs listed yet.</Typography>
    }
  }
  return <List>{renderJobs()}</List>
}

export default JobList
