import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
} from "react-icons/lu";


export const SIDE_MENU_DATA = [
    {
        _id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard"
    },
    {
        _id: "02",
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income"
    },
    {
        _id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense"
    },
    {
        _id: "04",
        label: "Logout",
        icon: LuLogOut,
        path: "/logout"
    },
]