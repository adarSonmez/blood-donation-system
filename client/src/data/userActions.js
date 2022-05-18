const userActions = {
  hospital: [
    { link: 'Order Blood', to: '/order-blood' },
    { link: 'My Orders', to: '/my-orders' },
  ],
  system_manager: [
    { link: 'Register User', to: '/register' },
    { link: 'Manage Orders', to: '/manage-orders' },
  ],
  receptionist: [{ link: 'Donate Blood', to: '/donation' }],
};

export default userActions;
