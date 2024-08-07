import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [
  {
    id: "dashboards",
    icon: "iconsminds-dashboard",
    label: "menu.dashboards",
    to: `${adminRoot}/dashboards`
  },
  {
    id: "daftar-member",
    icon: "iconsminds-network",
    label: "menu.daftar-member",
    to: `${adminRoot}/master-member`
  },
  {
    id: "daftar-transaksi",
    icon: "iconsminds-big-data",
    label: "menu.daftar-transaksi",
    to: `${adminRoot}/master-rent`
  },
  {
    id: "bebas-pustaka",
    icon: "iconsminds-library",
    label: "menu.bebas-pustaka",
    to: `${adminRoot}/bebas-pustaka`
  },
  {
    id: "settings",
    icon: "simple-icon-settings",
    label: "menu.settings",
    to: `${adminRoot}/settings`,
    subs: [
      {
        icon: "iconsminds-id-card",
        label: "menu.account",
        to: `${adminRoot}/settings/account`
      },
      {
        icon: "iconsminds-security-settings",
        label: "menu.api",
        to: `${adminRoot}/settings/api`
      },
      {
        icon: "iconsminds-time-backup",
        label: "menu.scheduler",
        to: `${adminRoot}/settings/scheduler`
      },
      {
        icon: "iconsminds-photo",
        label: "menu.banner",
        to: `${adminRoot}/settings/banner`
      }
    ]
  },
  {
    id: "laporan",
    icon: "iconsminds-printer",
    label: "menu.laporan",
    to: `${adminRoot}/Laporan`
  },
  {
    id: "logout",
    icon: "simple-icon-logout",
    label: "menu.logout",
    to: '/user/logout'
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
