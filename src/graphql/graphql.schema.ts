
/*
 * -------------------------------------------------------
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

export enum RetroMessageStatus {
    NORMAL = "NORMAL",
    CLOSED = "CLOSED",
    FOCUSED = "FOCUSED"
}

export enum RetroMessageType {
    HAPPY = "HAPPY",
    WONDERRING = "WONDERRING",
    UNHAPPY = "UNHAPPY",
    TODO = "TODO"
}

export class CreateCommentInput {
    content?: Nullable<string>;
    object: string;
    objectModel: CommentObjectUnionModel;
}

export class CreateDynamicInput {
    content?: Nullable<string>;
}

export class CreateNewsInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class CreateOAuthInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class CreateRetroMessageInput {
    retro: string;
    content: string;
    type: RetroMessageType;
}

export class UpdateRetroMessageInput {
    content?: Nullable<string>;
    status?: Nullable<RetroMessageStatus>;
    type?: Nullable<RetroMessageType>;
}

export class CreateRetroInput {
    content?: Nullable<string>;
    title?: Nullable<string>;
    date?: Nullable<string>;
}

export class CreateUserInput {
    phoneNumber?: Nullable<number>;
    password?: Nullable<string>;
}

export class RegisterUserInput {
    password: string;
    username: string;
    nickname?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    avatarUrl?: Nullable<string>;
    sex?: Nullable<number>;
    sign?: Nullable<string>;
    birthday?: Nullable<string>;
    position?: Nullable<string>;
    company?: Nullable<string>;
}

export class LoginUserInput {
    phoneNumber?: Nullable<string>;
    username?: Nullable<string>;
    password?: Nullable<string>;
}

export interface Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export abstract class IQuery {
    abstract comments(): Nullable<Nullable<Comment>[]> | Promise<Nullable<Nullable<Comment>[]>>;

    abstract comment(_id: string): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract dynamics(): Nullable<Nullable<Dynamic>[]> | Promise<Nullable<Nullable<Dynamic>[]>>;

    abstract dynamic(_id: string): Nullable<Dynamic> | Promise<Nullable<Dynamic>>;

    abstract newsList(): Nullable<Nullable<News>[]> | Promise<Nullable<Nullable<News>[]>>;

    abstract news(_id: string): Nullable<News> | Promise<Nullable<News>>;

    abstract oauths(): Nullable<Nullable<OAuth>[]> | Promise<Nullable<Nullable<OAuth>[]>>;

    abstract oauth(_id: string): Nullable<OAuth> | Promise<Nullable<OAuth>>;

    abstract retroMessages(retro?: Nullable<string>): Nullable<Nullable<RetroMessage>[]> | Promise<Nullable<Nullable<RetroMessage>[]>>;

    abstract retroMessage(_id: string): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract retros(): Nullable<Nullable<Retro>[]> | Promise<Nullable<Nullable<Retro>[]>>;

    abstract retro(_id: string): Nullable<Retro> | Promise<Nullable<Retro>>;

    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(_id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract login(input?: Nullable<LoginUserInput>): Nullable<UserWithToken> | Promise<Nullable<UserWithToken>>;

    abstract findRetroMessages(retro?: Nullable<string>): Nullable<Nullable<RetroMessage>[]> | Promise<Nullable<Nullable<RetroMessage>[]>>;

    abstract findRetroMessage(_id: string): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract findRetros(): Nullable<Nullable<Retro>[]> | Promise<Nullable<Nullable<Retro>[]>>;

    abstract findRetro(_id: string): Nullable<Retro> | Promise<Nullable<Retro>>;
}

export abstract class IMutation {
    abstract createComment(createCommentInput?: Nullable<CreateCommentInput>): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract createDynamic(input?: Nullable<CreateDynamicInput>): Nullable<Dynamic> | Promise<Nullable<Dynamic>>;

    abstract createNews(createNewsInput?: Nullable<CreateNewsInput>): Nullable<News> | Promise<Nullable<News>>;

    abstract createOAuth(createOAuthInput?: Nullable<CreateOAuthInput>): Nullable<OAuth> | Promise<Nullable<OAuth>>;

    abstract createRetroMessage(input?: Nullable<CreateRetroMessageInput>): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract updateRetroMessage(_id?: Nullable<string>, input?: Nullable<UpdateRetroMessageInput>): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract likeRetroMessage(_id?: Nullable<string>, count?: Nullable<number>): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract deleteRetroMessage(_id?: Nullable<string>): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract createRetro(input?: Nullable<CreateRetroInput>): Nullable<Retro> | Promise<Nullable<Retro>>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract register(input?: Nullable<RegisterUserInput>): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
    abstract commentCreated(): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract dynamicCreated(): Nullable<Dynamic> | Promise<Nullable<Dynamic>>;

    abstract newsCreated(): Nullable<News> | Promise<Nullable<News>>;

    abstract retroMessageCreated(): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract retroMessageUpdated(): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract retroMessageDeleted(): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract retroMessageLiked(): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract retroCreated(): Nullable<Retro> | Promise<Nullable<Retro>>;
}

export class Comment implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    content?: Nullable<string>;
    object: CommentObjectUnion;
}

export class Dynamic implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    content?: Nullable<string>;
}

export class News {
    _id: string;
    title?: Nullable<string>;
    cover?: Nullable<string>;
    html?: Nullable<string>;
}

export class OAuth {
    _id: string;
    platform?: Nullable<string>;
}

export class RetroMessage implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    content?: Nullable<string>;
    status?: Nullable<RetroMessageStatus>;
    type?: Nullable<RetroMessageType>;
    user?: Nullable<User>;
    like?: Nullable<number>;
}

export class Retro implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    content?: Nullable<string>;
    title?: Nullable<string>;
    date?: Nullable<string>;
    user?: Nullable<User>;
}

export class UserWithToken {
    token: string;
    user: User;
}

export class User {
    _id: string;
    username?: Nullable<string>;
    nickname?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    avatarUrl?: Nullable<string>;
    sex?: Nullable<number>;
    sign?: Nullable<string>;
    birthday?: Nullable<string>;
    position?: Nullable<string>;
    company?: Nullable<string>;
}

export type CommentObjectUnion = News | Comment;
type Nullable<T> = T | null;
