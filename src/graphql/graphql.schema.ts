
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Role {
    ADMIN = "ADMIN",
    REVIEWER = "REVIEWER",
    USER = "USER",
    UNKNOWN = "UNKNOWN"
}

export enum CommentObjectUnionModel {
    News = "News",
    Comment = "Comment"
}

export class CreateCommentInput {
    content?: string;
    object: string;
    objectModel: CommentObjectUnionModel;
}

export class CreateNewsInput {
    name?: string;
    age?: number;
}

export class CreateOAuthInput {
    name?: string;
    age?: number;
}

export class CreateUserInput {
    phoneNumber?: number;
    password?: string;
}

export class RegisterUserInput {
    phoneNumber?: string;
    password?: string;
}

export interface Document {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
}

export abstract class IQuery {
    abstract commentsList(): Comment[] | Promise<Comment[]>;

    abstract comment(id: string): Comment | Promise<Comment>;

    abstract newsList(): News[] | Promise<News[]>;

    abstract news(id: string): News | Promise<News>;

    abstract oauthsList(): OAuth[] | Promise<OAuth[]>;

    abstract oauth(id: string): OAuth | Promise<OAuth>;

    abstract usersList(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createComment(createCommentInput?: CreateCommentInput): Comment | Promise<Comment>;

    abstract createNews(createNewsInput?: CreateNewsInput): News | Promise<News>;

    abstract createOAuth(createOAuthInput?: CreateOAuthInput): OAuth | Promise<OAuth>;

    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;

    abstract register(input?: RegisterUserInput): User | Promise<User>;
}

export abstract class ISubscription {
    abstract commentCreated(): Comment | Promise<Comment>;

    abstract newsCreated(): News | Promise<News>;
}

export class Comment implements Document {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
    content?: string;
    object: CommentObjectUnion;
}

export class News {
    _id: string;
    title?: string;
}

export class OAuth {
    _id: string;
    platform?: string;
}

export class User {
    _id: string;
    nickname?: string;
}

export type CommentObjectUnion = News | Comment;
