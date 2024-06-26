import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    ImageGravity,
    Query,
    Storage,
    Models,
} from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || '',
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM || '',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECTID || '',
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASEID || '',
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERCOLLECTIONID || '',
    videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEOCOLLECTIONID || '',
    storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGEID || '',
};

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(
    email: string,
    password: string,
    username: string
) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        throw new Error(String(error));
    }
}

// Sign In
export async function signIn(email: string, password: string) {
    try {
        await signOut();
        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        return session;
    } catch (error) {
        throw new Error(String(error));
    }
}

// Get Account
export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        throw new Error(String(error));
    }
}

// Get Current User
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(String(error));
        return null;
    }
}

// Sign Out
export async function signOut() {
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (error) {
        throw new Error(String(error));
    }
}

// Upload File
export async function uploadFile(file: any, type: string) {
    if (!file) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(String(error));
    }
}

// Get File Preview
export async function getFilePreview(fileId: string, type: string) {
    let fileUrl;

    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId,
                fileId,
                2000,
                2000,
                ImageGravity.Top,
                100
            );
        } else {
            throw new Error('Invalid file type');
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw new Error(String(error));
    }
}

// Create Video Post
export async function createVideoPost(form: {
    title: string;
    thumbnail: File;
    video: File;
    prompt: string;
    userId: string;
}) {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ]);

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        );

        return newPost;
    } catch (error) {
        throw new Error(String(error));
    }
}

interface Post {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: any[];
    $tenant: string;
    $updatedAt: string;
    creator: Creator;
    prompt: string;
    thumbnail: string;
    title: string;
    video: string;
}

interface Creator {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: Function[];
    $tenant: string;
    $updatedAt: string;
    accountId: string;
    avatar: string;
    email: string;
    username: string;
}

// Get all video Posts
export async function getAllPosts(): Promise<Models.Document[]> {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        );

        return posts.documents;
    } catch (error) {
        throw new Error(String(error));
    }
}

// Get video posts created by user
export async function getUserPosts(userId: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal('creator', userId)]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(String(error));
    }
}

// Get video posts that matches search query
export async function searchPosts(query: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search('title', query)]
        );

        if (!posts) throw new Error('Something went wrong');

        return posts.documents;
    } catch (error) {
        throw new Error(String(error));
    }
}

// Get latest created video posts
export async function getLatestPosts(): Promise<Models.Document[]> {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(String(error));
    }
}
