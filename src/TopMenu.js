import React, { Fragment, useEffect } from 'react';
import { Menu, Image, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout, checkLocalCredentials } from './redux/actions';

import LoginModal from './modals/LoginModal';

const TopMenu = props => {
    const { isLoggedIn, logout, userId, userRole, checkLocalCredentials } = props;
    
    useEffect(() => {
        checkLocalCredentials();
    },[]);

    return (
        <Menu>
            <Menu.Menu position='left'>
                <Menu.Item>
                    <h2>Project Marketplace</h2>
                </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position='right'>

                { isLoggedIn && <Fragment>
                        <Menu.Item>
                            <Label>{ userRole }</Label>
                            <span className="hide-sm">
                                <Image style={{display: 'inline', height: '20px', width: '20px', margin: '0 10px'}} src={`https://i.pravatar.cc/150?img=${userId}`} circular size='mini' />
                                { userId }
                            </span>
                        </Menu.Item>
                        <Menu.Item id="logout" onClick={logout} name='log out' /> 
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

const mapDispatchToProps = { logout, checkLocalCredentials }

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);