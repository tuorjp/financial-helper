import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router";

export type LinkElement = {
  name: string
  route?: string
  icon?: React.ReactNode
  function?: (...args: unknown[]) => unknown | void
}

export type LinkComponentProps = {
  links: LinkElement[]
}

export function LinkComponent({ links }: LinkComponentProps) {
  const navigate = useNavigate()

  return (
    <List>
      {
        links.map((element, index) => (
          <ListItem
            disablePadding
            key={index}
            onClick={() => {
              if (element.route) navigate(element.route)
              if(element.function) element.function()
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {element.icon}
              </ListItemIcon>
              <ListItemText primary={element.name} />
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
  )
}