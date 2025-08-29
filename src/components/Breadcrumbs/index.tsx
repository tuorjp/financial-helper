
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";


export default function BreadcrumbsComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{mb: 2}}>
      <Link
        underline="hover"
        color="inherit"
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
      >
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        let label

        switch (name) {
          case 'category':
            label = 'Categorias'
            break;
          case 'receipt':
            label = 'Recebimentos'
            break;
          case 'payment':
            label = 'Pagamentos'
            break;
          default:
            label = ''
            break;
        }

        return isLast ? (
          <Typography key={name} color="text.primary">
            {label}
          </Typography>
        ) : (
          <Link
            key={name}
            underline="hover"
            color="inherit"
            onClick={() => navigate(routeTo)}
            sx={{ cursor: "pointer" }}
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
