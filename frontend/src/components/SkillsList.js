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
        <ListItem key={skill.skill.pk}>
          <ListItemText primary={skill.skill.title} />
        </ListItem>
      ))
    } else {
      return <Typography variant="body1">No skills found.</Typography>
    }
  }
  return (
    <Box border={1} p={4}>
      <Typography variant="h4">Most Used Skills</Typography>
      <List>{renderSkills()}</List>
    </Box>
  )
}

export default SkillsList
