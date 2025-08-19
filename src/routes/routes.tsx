import { Route, Routes } from "react-router";
import Login from "../app/login";
import Register from "../app/register";
import { Template } from "../template";
import Home from "../app/home";
import Category from "../app/category";
import Payment from "../app/payment";
import Receipt from "../app/receipt";

export function ApplicationRoutes() {
  return (
    <Routes>
      <Route element={<Template />}>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />}/>
        <Route path="/category" element={<Category />}/>
        <Route path="/payment" element={<Payment />}/>
        <Route path="/receipt" element={<Receipt />}/>
      </Route>
    </Routes>
  )
}

export function LoginRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />}/>
    </Routes>
  )
}
