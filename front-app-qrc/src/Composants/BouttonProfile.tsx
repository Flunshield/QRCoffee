import { useUser, SignedOut, useClerk } from '@clerk/clerk-react';
import React, { useState } from "react";
import Button from '../ComposantsCommun/Button';
import { ROOT_MY_ACCOUNT } from '../Constantes/ConstantRoute';
import '../StyleCss/Boutton.css';
import BouttonLog from './BouttonLog';
import { Link } from 'react-router-dom';

const BouttonProfile = () => {

    const { user, isSignedIn } = useUser();
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            {isSignedIn ? (
                <div
                    id="id-bouton-profile"
                    className="relative"
                    onMouseEnter={() => setShowPopup(true)}
                    onMouseLeave={() => setShowPopup(false)}
                >
                    <img
                        src={user?.profileImageUrl}
                        alt="profile"
                        className="w-14 rounded-full cursor-pointer"
                    />
                    {showPopup && (
                        <div className="fixed top-14 right-0 bg-white p-2 rounded shadow">
                            <div className='pb-2'>
                            <Button id='button-compte' type={'button'} >
                            <Link to={ROOT_MY_ACCOUNT.code} >Mon Compte</Link>
                            </Button>
                            </div>
                            <div>
                            <BouttonLog />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <BouttonLog />
            )}
        </>
    )
}

export default BouttonProfile
