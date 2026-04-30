import {Grid, Button, Paper, Typography} from "@material-ui/core"
import {useForm} from "react-hook-form"
import {FormInputText} from "./components/FormInputText"
import {FormInputDropdown} from "./components/FormInputDropdown"
import {styled} from "@material-ui/core"

import {
  languages,
  products,
  brands,
  markets,
  pages,
  sources,
  areas,
  placements,
  welcomeOffers
} from "./data"

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
  languages: "",
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

let hasSubmitted = 0
let addAnother = false
let errors = undefined

export const GoLinkForm = ({onClose}) => {
  const methods = useForm({defaultValues: defaultValues})
  const {handleSubmit, reset, control} = methods

  const onSubmit = (data) => {
    const golinks = JSON.parse(localStorage.getItem("golinks")) || []
    const redirects = JSON.parse(localStorage.getItem("redirects")) || []

    const id = makeid(25)

    const golink = {
      ...data,
      url: `/go/${id}`,
      createdBy: "demo@catenamedia.com",
      updatedAt: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString().slice(0, 10),
      id: new Date().getTime().toString(36)
    }

    delete golink.affiliate_url

    const redirect = {
      product: data.product,
      brand: data.brand,
      golink_url: `/go/${id}`,
      affiliate_url: data.affiliate_url,
      updatedAt: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString().slice(0, 10),
      id: new Date().getTime().toString(36)
    }

    golinks.push(golink)
    redirects.push(redirect)

    localStorage.setItem("golinks", JSON.stringify(golinks))
    localStorage.setItem("redirects", JSON.stringify(redirects))

    if (addAnother) {
      addAnother = false
      hasSubmitted += 1
      reset()
    } else {
      onClose()
    }
  }

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px auto",
        maxWidth: "750px"
      }}
    >
      <Typography variant="h6">Link generation</Typography>

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
            name="languages"
            control={control}
            label="Languages"
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
        <Grid item xs={4}>
          <FormInputDropdown
            options={markets.map((market) => ({
              label: market,
              value: market
            }))}
            name="market"
            control={control}
            label="Market"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputDropdown
            options={pages.map((page) => ({
              label: page,
              value: page
            }))}
            name="page"
            control={control}
            label="Page"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputDropdown
            options={placements.map((placement) => ({
              label: placement,
              value: placement
            }))}
            name="placement"
            control={control}
            label="Placement"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputDropdown
            options={welcomeOffers.map((offer) => ({
              label: offer,
              value: offer
            }))}
            name="welcome_offer"
            control={control}
            label="Welcome Offer"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputDropdown
            options={sources.map((source) => ({
              label: source,
              value: source
            }))}
            name="source"
            control={control}
            label="Source"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <FormInputDropdown
            options={areas.map((area) => ({
              label: area,
              value: area
            }))}
            name="area"
            control={control}
            label="Area"
            required
          />
        </Grid>
      </Grid>

      <FormInputText
        name="affiliate_url"
        control={control}
        label="Affiliate Link Url"
        required
      />

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Button
            onClick={() => {
              hasSubmitted > 0 && !errors.length > 0 && reset()
            }}
            variant={"outlined"}
          >
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
              addAnother = true
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
