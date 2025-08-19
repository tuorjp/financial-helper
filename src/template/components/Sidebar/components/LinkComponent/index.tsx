import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router";

export type LinkElement = {
  name: string
  route?: string
  icon?: React.ReactNode
  function?: () => void
}

export type LinkComponentProps = {
  links: LinkElement[]
}

export function LinkComponent({ links }: LinkComponentProps) {
  const navigate = useNavigate()

  return (
    <List>
      {
        links.length > 0
          ?
          links.map((element, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton onClick={() => {
                if (element.route) navigate(element.route)
              }}>
                <ListItemIcon>
                  {element.icon}
                </ListItemIcon>
                <ListItemText primary={element.name} />
              </ListItemButton>
            </ListItem>
          ))
          :
          <></>
      }
    </List>
  )
}