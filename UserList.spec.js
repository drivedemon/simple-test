// just mock up
// import vi / other
// import axios
// import UserList component

vi.mock('axios');

describe('UserList', () => {
  it('show Loading... when access component', () => {
    const component = mount(UserList, {
      props: {
        users: [],
        loading: false,
        error: null,
      },
    });

    expect(component.text()).not.toContain('Loading...');

    await component.setProps({loading: true})

    expect(component.text()).toContain('Loading...');
  });

  it('show user list when fetch success', () => {
    axios.get.mockResolvedValueOnce({data: [{id: 1, name: 'drive'}]});

    const component = mount(UserList, {
      props: {
        users: [],
        loading: false,
        error: null,
      },
    });

    await component.vm.$nextTick();

    expect(component.props().error).toBeNull();
    expect(component.props().loading).toBeFalsy();
    expect(component.props().users).toHaveLength(1);
    expect(component.props().users).not.toBeNull();

    expect(component.text()).toContain('drive');
  });

  it('show error message when fetch failed', () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch users'));

    const component = mount(UserList, {
      props: {
        users: [],
        loading: false,
        error: null,
      },
    });

    await component.vm.$nextTick();

    expect(component.props().error).not.toBeNull();
    expect(component.props().error).toBe('Failed to fetch users');

    expect(component.text()).toContain('Failed to fetch users');
  });
});
