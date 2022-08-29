import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import BloodtypeIcon from '@mui/icons-material/Bloodtype'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import HelpIcon from '@mui/icons-material/Help'
import HomeIcon from '@mui/icons-material/Home'

export type SideMenuItem = {
  link: string
  to: string
  icon: JSX.Element
}

const userActions = {
  system_manager: [
    { link: 'Register User', to: '/register', icon: <AppRegistrationIcon /> },
    {
      link: 'Manage Orders',
      to: '/manage-orders',
      icon: <ManageHistoryIcon />,
    },
    {
      link: 'Manage Account',
      to: '/manage-account',
      icon: <ManageAccountsIcon />,
    },
  ],
  receptionist: [
    { link: 'Donate Blood', to: '/donation', icon: <BloodtypeIcon /> },
    {
      link: 'Manage Account',
      to: '/manage-account',
      icon: <ManageAccountsIcon />,
    },
  ],
  hospital: [
    { link: 'Order Blood', to: '/order-blood', icon: <LocalShippingIcon /> },
    {
      link: 'Manage Account',
      to: '/manage-account',
      icon: <ManageAccountsIcon />,
    },
  ],
  common: [
    { link: 'Homepage', to: '/', icon: <HomeIcon /> },
    { link: 'Champions', to: '/champions', icon: <EmojiEventsIcon /> },
    { link: 'How to Donate', to: '/how-to-donate', icon: <HelpIcon /> },
  ],
}

export default userActions
