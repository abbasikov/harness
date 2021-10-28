import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as urls from '../constants'

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@material-ui/core'

const SkillsList = () => {
  const [state, setState] = useState([])
  useEffect(() => {
    const getSkills = () => {
      axios.get(urls.mostUsedSkilss).then((response) => setState(response.data))
    }
    getSkills()
  }, [])
  const renderSkills = () => {
    if (state.length > 0) {
      return state.map((skill) => (
        <ListItem key={skill.pk}>
          <ListItemText
            primary={skill.title}
            secondary={`${skill.job_count} times`}
          />
        </ListItem>
      ))
    } else {
      return <Typography variant="body1">No skills found.</Typography>
    }
  }
  return <List>{renderSkills()}</List>
}

export default SkillsList
