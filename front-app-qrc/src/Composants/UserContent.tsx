import {UserProfile} from "@clerk/clerk-react";

const UserContent = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-bold">
            <UserProfile
                appearance={{
                    elements: {
                        scrollBox: {
                            backgroundColor: "#FFD791"
                        },
                        navbar: {
                            backgroundColor: ""
                        },
                        profileSectionPrimaryButton: {
                            color: "#413620",
                            backgroundColor: "#ffffff",
                        },
                        profileSectionContent: {
                            color: "#413620",
                            backgroundColor: "#ffffff",
                        }
                    },
                }}
            />
        </div>
    );
};

export default UserContent;