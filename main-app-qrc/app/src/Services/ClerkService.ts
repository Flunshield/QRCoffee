import clerk from '@clerk/clerk-sdk-node';

async function getUserList() {
    const userList = await clerk.users.getUserList();
    return userList
}

async function getClientID (clientId: string) {
    const client = await clerk.clients.getClient(clientId);
    return client
}

async function verifyClient (sessionToken: string) {
    const sessionTokenValid  = await clerk.clients.verifyClient(sessionToken);
    return sessionTokenValid
}

async function deleteUser (userId: string) {
    const user = await clerk.users.deleteUser(userId);
}

export async function addRolePremium(userId: string) {
    try {
        const params = {
            privateMetadata: {
                role: "Premium",
            },
        };

        await clerk.users.updateUserMetadata(userId, params);

    } catch (error) {
        console.error('Erreur lors de l\'ajout du rôle "Premium" à l\'utilisateur :', error);
    }
}

export async function getMemberIsAdmin(userId: string) {
    const user = await clerk.users.getUser(userId);
    return user.privateMetadata.role === "Admin";
}

export async function getMemberIsPremium(userId: string) {
    const user = await clerk.users.getUser(userId);
    return user.privateMetadata.role === "Premium";
}
