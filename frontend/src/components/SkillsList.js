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

const SkillsList = () => {
  const [state, setState] = useState({
    skills: [],
  })

  useEffect(() => {
    const getSkills = () => {
      axios
        .get(urls.mostUsedSkilss)
        .then((response) => setState({ skills: response.data }))
    }
    getSkills()
  }, [])

  const renderSkills = () => {
    if (state.skills.length > 0) {
      return state.skills.map((skill) => (
        <ListItem>
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
