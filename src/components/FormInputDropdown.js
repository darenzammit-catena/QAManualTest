import React from "react"
import {TextField, MenuItem} from "@material-ui/core"
import {Controller} from "react-hook-form"
import {styled} from "@material-ui/core"

const MyTextField = styled(TextField)({
  width: "100%",
  marginBottom: "20px"
})

export const FormInputDropdown = ({
  options,
  name,
  control,
  label,
  required
}) => {
  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      )
    })
  }

  return (
    <Controller
      required={required}
      render={({field: {onChange, value}}) => (
        <MyTextField
          variant="outlined"
          label={`${label} ${required ? " *" : ""}`}
          select
          value={value}
          onChange={onChange}
        >
          {generateSingleOptions()}
        </MyTextField>
      )}
      control={control}
      name={name}
    />
  )
}
