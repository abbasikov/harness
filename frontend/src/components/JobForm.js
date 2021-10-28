import React from 'react'
import { Formik, Form, useField, FieldArray } from 'formik'
import { TextField, Grid, Typography, Button } from '@material-ui/core'

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <TextField
      {...field}
      label={label}
      helperText={errorText}
      error={!!errorText}
      fullWidth
    />
  )
}

const JobForm = ({ job, formRef }) => {
  const handleSubmit = (values, actions) => {
    actions.resetForm({
      values: {
        title: '',
        skills: [],
        description: '',
      },
    })
    return values
  }

  return (
    <React.Fragment>
      <Typography variant="h4">Post a new Job</Typography>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={job}
        innerRef={formRef}
      >
        {({ values }) => (
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <MyTextField fullWidth name="title" label="Title" />
              </Grid>
              <Grid item xs={12}>
                <FieldArray
                  name="skills"
                  render={(arrayHelpers) => (
                    <div>
                      {values.skills && values.skills.length > 0 ? (
                        values.skills.map((skill, index) => (
                          <div key={index}>
                            <MyTextField
                              name={`skills.${index}`}
                              label="Skill"
                            />
                            <Button
                              type="button"
                              variant="outlined"
                              size="small"
                              color="secondary"
                              onClick={() => arrayHelpers.remove(index)} // remove a skill from the list
                            >
                              -
                            </Button>
                            <Button
                              type="button"
                              variant="outlined"
                              size="small"
                              color="secondary"
                              onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                            >
                              +
                            </Button>
                          </div>
                        ))
                      ) : (
                        <Button
                          color="secondary"
                          variant="outlined"
                          size="small"
                          type="button"
                          onClick={() => arrayHelpers.push('')}
                        >
                          {/* show this when user has removed all skills from the list */}
                          Add a skill
                        </Button>
                      )}
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  fullWidth
                  multiLine
                  name="description"
                  label="Description"
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  )
}

export default JobForm
