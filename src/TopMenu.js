import React, { Fragment } from 'react';
import { Menu, Image, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout } from './redux/actions';

import LoginModal from './modals/LoginModal';

const TopMenu = props => {
    const { isLoggedIn, logout, userId, userRole } = props;
    return (
        <Menu>
            <Menu.Menu position='left'>
                <Menu.Item>
                    <h2>Contractor Marketplace</h2>
                </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position='right'>

                { isLoggedIn && <Fragment>
                        <Menu.Item>
                            <Label>{ userRole }</Label>
                            <Image style={{display: 'inline', height: '20px', width: '20px', margin: '0 10px'}} src={`https://i.pravatar.cc/150?img=${userId}`} circular size='mini' />
                            { userId }
                        </Menu.Item>
                        <Menu.Item onClick={logout} name='log out' /> 
                    </Fragment>
                }
                { !isLoggedIn && <LoginModal />}
            </Menu.Menu>
        </Menu>
    )
};

const mapStateToProps = state => ({
    isLoggedIn: state.userReducer.userId !== '',
    userId: state.userReducer.userId,
    userRole: state.userReducer.userRole
})

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);