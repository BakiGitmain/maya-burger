import type { Metadata } from "next";

import MenuPage from "../../../components/menu/menu-page";

export const metadata: Metadata = {
  title: "Menu | Maya Burger",
  description:
    "Explore fresh burgers, crispy sides, drinks and more from Maya Burger.",
};

export default function MenuRoute() {
  return <MenuPage />;
}