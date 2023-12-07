import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [
  {
    id: "dashboards",
    icon: "iconsminds-shop-4",
    label: "menu.dashboards",
    to: `${adminRoot}/dashboards`
  },
  {
    id: "daftar-member",
    icon: "iconsminds-shop-4",
    label: "menu.daftar-member",
    to: `${adminRoot}/dashboards`
  },
  {
    id: "daftar-transaksi",
    icon: "iconsminds-shop-4",
    label: "menu.daftar-transaksi",
    to: `${adminRoot}/dashboards`
  },
  {
    id: "bebas-pustaka",
    icon: "iconsminds-shop-4",
    label: "menu.bebas-pustaka",
    to: `${adminRoot}/dashboards`
  },
  {
    id: "settings",
    icon: "iconsminds-shop-4",
    label: "menu.settings",
    to: `${adminRoot}/dashboards`
  },
  {
    id: "laporan",
    icon: "iconsminds-shop-4",
    label: "menu.laporan",
    to: `${adminRoot}/dashboards`
  },
  {
    id: "logout",
    icon: "iconsminds-shop-4",
    label: "menu.logout",
    to: `${adminRoot}/dashboards`
  },
  // {
  //   id: "master-member",
  //   icon: "iconsminds-bucket",
  //   label: "menu.master-member",
  //   to: `${adminRoot}/master-member`
  // },
  // {
  //   id: "master-book",
  //   icon: "iconsminds-bucket",
  //   label: "menu.master-book",
  //   to: `${adminRoot}/master-book`
  // },
  // {
  //   id: "master-rent",
  //   icon: "iconsminds-bucket",
  //   label: "menu.master-rent",
  //   to: `${adminRoot}/master-rent`
  // }
];

export default data;
