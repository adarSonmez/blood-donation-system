import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import BloodtypeIcon from '@mui/icons-material/Bloodtype'
import RestoreIcon from '@mui/icons-material/Restore'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import HelpIcon from '@mui/icons-material/Help'

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
    { link: 'My Orders', to: '/my-orders', icon: <RestoreIcon /> },
    { link: 'Order Blood', to: '/order-blood', icon: <LocalShippingIcon /> },
    {
      link: 'Manage Account',
      to: '/manage-account',
      icon: <ManageAccountsIcon />,
    },
  ],
  common: [
    { link: 'Top Tens', to: '/top-tens', icon: <EmojiEventsIcon /> },
    { link: 'How to Donate', to: '/how-to-donate', icon: <HelpIcon /> },
  ],
}

export default userActions