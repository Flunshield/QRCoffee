import React from 'react';
import {useClerk, useUser} from '@clerk/clerk-react';
import Button from '../ComposantsCommun/Button';
import {LOGIN, LOGOUT} from '../Constantes/ConstantRoute';
import '../StyleCss/Boutton.css';
const BouttonLog = () => {
    const {isSignedIn} = useUser();
    const {signOut} = useClerk();

    const handleButtonLoginClick = () => {
        window.location.href = '/SignIn';
    };

    const handleButtonLogOutClick = () => {
        signOut();

        window.location.href = '/';
    };
    return (
        isSignedIn ? (
            <Button id="Connexion" type='button' onClick={handleButtonLogOutClick}>
                {LOGOUT}
            </Button>
        ) : (
            <Button id="Déconnexion" type="button" onClick={handleButtonLoginClick}>
                {LOGIN}
            </Button>
        )
    );
};

export default BouttonLog;