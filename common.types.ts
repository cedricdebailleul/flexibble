import { User, Session } from 'next-auth'

export type FormState = {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
}

export interface ProjectInterface {
    id: string;
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
    createdBy: {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
    };
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string;
    avatarUrl: string;
    linkedinUrl: string;
    githubUrl: string;
    projects:{
        edges: {
            node: ProjectInterface
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: string;
            endCursor: string;
        };
    };
}

export interface SessionInterface extends Session {
    user: User & {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
    };
}

export interface ProjectForm{
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
}