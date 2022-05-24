const userActions = {
  system_manager: [
    { link: 'Register User', to: '/register' },
    { link: 'Manage Orders', to: '/manage-orders' },
    { link: 'Manage Account', to: '/manage-account' },
  ],
  receptionist: [
    { link: 'Donate Blood', to: '/donation' },
    { link: 'Manage Account', to: '/manage-account' },
  ],
  hospital: [
    { link: 'Order Blood', to: '/order-blood' },
    { link: 'My Orders', to: '/my-orders' },
    { link: 'Manage Account', to: '/manage-account' },
  ],
};

export default userActions;
