import React from "react"
import {Controller, useFormContext} from "react-hook-form"
import TextField from "@material-ui/core/TextField"

export const FormInputText = ({name, control, label, required}) => {
  return (
    <Controller
      name={name}
      control={control}
      required={required}
      render={({field: {onChange, value}, fieldState: {error}, formState}) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={`${label} ${required ? " *" : ""}`}
          variant="outlined"
        />
      )}
    />
  )
}
