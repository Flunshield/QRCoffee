import {SignIn} from "@clerk/clerk-react";


export default function Signin() {

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <SignIn
                    afterSignInUrl={"/"}
                    appearance={{
                        layout: {
                            showOptionalFields: true,
                            socialButtonsPlacement: "bottom",
                            socialButtonsVariant: "iconButton",
                        },
                        elements: {
                            logoImage: {
                                width: "120px", height: "120px", position: "relative",
                                top: "100%", // Place l'image verticalement au milieu
                                left: "160px", // Place l'image horizontalement au milieu
                                transform: "translate(-50%, -50%)",
                            },
                            card: {
                                backgroundColor: "#FFD791"
                            },
                            socialButtons: {
                                backgroundColor: "#ffffff",
                            },
                            formButtonPrimary: {
                                backgroundColor: "#413620",
                                "&:hover, &:focus, &:active": {
                                    backgroundColor: "#615641",
                                },
                            },
                            identityPreview: {
                                backgroundColor: "#ffffff",
                            },
                            alternativeMethodsBlockButton: {
                                backgroundColor: "#ffffff",
                            }
                        },
                    }}
                />
            </div>
        </>
    );
}