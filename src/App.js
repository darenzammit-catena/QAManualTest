import {Typography, Button} from "@material-ui/core"
import {styled} from "@material-ui/core"
import React, {useState, useEffect} from "react"
import "./app.css"

import {GoLinksList} from "./GoLinksList"
import {RedirectsList} from "./RedirectsList"

const MyTypography = styled(Typography)({
  textAlign: "center"
})
const NavigationWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  gap: "10px"
})
const ListWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  gap: "10px",
  maxWidth: "1350px",
  margin: "0 auto"
})
const TestButton = styled(Button)({
  position: "absolute",
  right: "0",
  top: "0",
  justifyContent: "center",
  textAlign: "center",
  gap: "10px"
})

function App() {
  const [hasChangedView, setHasChangedView] = useState(false)
  const [view, setView] = useState("go-links")
  const [refresh, setRefresh] = useState(0)

  if (localStorage.getItem("golinks") === null) {
    localStorage.setItem(
      "redirects",
      '[{"product":"askgamblers.com","brand":"LeoVegas","golink_url":"/go/xfdlbjtrpehfbevrbywosdc","affiliate_url":"http://netrefer.com/2sa4ses3Ase32","updatedAt":"2022-11-09","createdAt":"2022-11-09","id":"la9k31sr"},{"product":"askgamblers.com","brand":"LeoVegas","golink_url":"/go/tqrffglspjdzjyjicdncxmqmh","affiliate_url":"http://topreferralls.net/wqe123sedqw2?q=wer-23s-xcx","updatedAt":"2022-11-09","createdAt":"2022-11-09","id":"la9k8cro"}]'
    )
    localStorage.setItem(
      "golinks",
      '[{"product":"askgamblers.com","languages":"en","brand":"LeoVegas","market":"America","page":"None","placement":"General","welcome_offer":"Bet & Get","source":"Web","url":"/go/xfdlbjtrpehfbevrbywosdc","area":"Bingo","createdBy":"demo@catenamedia.com","updatedAt":"2022-11-09","createdAt":"2022-11-09","id":"la9k31sr"},{"product":"askgamblers.com","languages":"en","brand":"LeoVegas","market":"Europe","page":"Homepage","placement":"General","welcome_offer":"Bet & Get","source":"Web","url":"/go/tqrffglspjdzjyjicdncxmqmh","area":"Bingo","createdBy":"demo@catenamedia.com","updatedAt":"2022-11-09","createdAt":"2022-11-09","id":"la9k8cro"}]'
    )
  }

  useEffect(() => {
    if (view === "redirects") {
      setHasChangedView(true)
    }
  }, [view])

  const reset = () => {
    localStorage.removeItem("golinks")
    localStorage.removeItem("redirects")
    setRefresh(refresh + 1)
  }

  return (
    <div>
      <MyTypography variant="h4"> Catena Media QA Test </MyTypography>
      <TestButton onClick={() => reset()}> Reset environment </TestButton>
      <NavigationWrapper>
        <Button variant="outlined" onClick={() => setView("go-links")}>
          Go links
        </Button>
        <Button variant="outlined" onClick={() => setView("redirects")}>
          Redirects
        </Button>
      </NavigationWrapper>
      <ListWrapper>
        {view === "go-links" && <GoLinksList hasChangedView={hasChangedView} />}
        {view === "redirects" && <RedirectsList />}
      </ListWrapper>
    </div>
  )
}

export default App
