import {Grid, Button, Paper, Typography} from "@material-ui/core"
import {useForm} from "react-hook-form"
import {FormInputText} from "./components/FormInputText"
import {FormInputDropdown} from "./components/FormInputDropdown"
import {styled} from "@material-ui/core"
import {useState} from "react"

import {languages, products, brands} from "./data"

function makeid(length) {
  var result = ""
  var characters = "abcdefghijklmnopqrstuvwxyz"
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const defaultValues = {
  product: "",
  language: "",
  brand: "",
  market: "",
  page: "",
  placement: "",
  welcome_offer: "",
  source: "",
  url: "",
  area: ""
}

const MyGrid = styled(Grid)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginBottom: "10px"
})

const checkDifferences = () => {
  return false
}

const validateRedirectModel = (model) => {
  if (checkDifferences(model)) {
    return true
  } else {
    throw new Error("Redirect model is not supported.")
  }
}

export const RedirectsForm = ({onClose}) => {
  const methods = useForm({defaultValues: defaultValues})
  const {handleSubmit, reset, control} = methods

  const [addAnother, setAddAnother] = useState(false)

  const onSubmit = (data) => {
    const redirects = JSON.parse(localStorage.getItem("redirects")) || []

    const redirect = {
      product: data.product,
      brand: data.brand,
      golink_url: `/go/${makeid(25)}`,
      affiliate_url: data.url,
      updatedAt: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString().slice(0, 10),
      id: new Date().getTime().toString(36)
    }

    if (validateRedirectModel(redirect)) {
      redirects.push(redirect)

      localStorage.setItem("redirects", JSON.stringify(redirects))

      if (addAnother) {
        reset()
        setAddAnother(false)
      } else {
        onClose()
      }
    }
  }

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 300px"
      }}
    >
      <Typography variant="h6">Redirects generation</Typography>

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <FormInputDropdown
            options={products.map((product) => ({
              label: product,
              value: product
            }))}
            name="product"
            control={control}
            label="Product"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputDropdown
            options={languages.map((language) => ({
              label: language.name,
              value: language.code
            }))}
            name="language"
            control={control}
            label="Language"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputDropdown
            options={brands.map((brand) => ({
              label: brand,
              value: brand
            }))}
            name="brand"
            control={control}
            label="Brand"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputText
            name="golink_url"
            control={control}
            label="Go Link Url"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputText
            name="affiliate_url"
            control={control}
            label="Affiliate Link Url"
            required
          />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Button onClick={() => reset()} variant={"outlined"}>
            Reset Values
          </Button>
        </Grid>
        <MyGrid item xs={8}>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant={"contained"}
            color="primary"
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setAddAnother(true)
              handleSubmit(onSubmit)()
            }}
            variant={"contained"}
          >
            Save & Add another
          </Button>
        </MyGrid>
      </Grid>
    </Paper>
  )
}
