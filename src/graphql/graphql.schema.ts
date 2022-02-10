
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
    Dynamic = "Dynamic",
    Comment = "Comment",
    RetroMessage = "RetroMessage"
}

export enum LikeObjectUnionModel {
    News = "News",
    Dynamic = "Dynamic",
    Comment = "Comment",
    RetroMessage = "RetroMessage"
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

export class ReplyCommentInput {
    content?: Nullable<string>;
    to: string;
}

export class CreateNewsInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class CreateDynamicInput {
    content?: Nullable<string>;
    pictures?: Nullable<string[]>;
}

export class CreateLikeInput {
    object: string;
    objectModel: LikeObjectUnionModel;
}

export class CreateRetroMessageInput {
    retro: string;
    content: string;
    type: RetroMessageType;
    pictures?: Nullable<string[]>;
    anonymous?: Nullable<boolean>;
}

export class UpdateRetroMessageInput {
    content?: Nullable<string>;
    status?: Nullable<RetroMessageStatus>;
    type?: Nullable<RetroMessageType>;
    pictures?: Nullable<string[]>;
    anonymous?: Nullable<boolean>;
}

export class CreateOAuthInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class CreateRetroInput {
    content?: Nullable<string>;
    title?: Nullable<string>;
    date?: Nullable<string>;
    anonymous?: Nullable<boolean>;
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
    abstract findComments(object: string): Nullable<Nullable<Comment>[]> | Promise<Nullable<Nullable<Comment>[]>>;

    abstract findComment(_id: string): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract newsList(): Nullable<Nullable<News>[]> | Promise<Nullable<Nullable<News>[]>>;

    abstract news(_id: string): Nullable<News> | Promise<Nullable<News>>;

    abstract findDynamics(): Nullable<Nullable<Dynamic>[]> | Promise<Nullable<Nullable<Dynamic>[]>>;

    abstract findDynamic(_id: string): Nullable<Dynamic> | Promise<Nullable<Dynamic>>;

    abstract findLikes(object: string): Nullable<Nullable<Like>[]> | Promise<Nullable<Nullable<Like>[]>>;

    abstract findLike(_id: string): Nullable<Like> | Promise<Nullable<Like>>;

    abstract findRetroMessages(retro?: Nullable<string>): Nullable<Nullable<RetroMessage>[]> | Promise<Nullable<Nullable<RetroMessage>[]>>;

    abstract findRetroMessage(_id: string): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract oauths(): Nullable<Nullable<OAuth>[]> | Promise<Nullable<Nullable<OAuth>[]>>;

    abstract oauth(_id: string): Nullable<OAuth> | Promise<Nullable<OAuth>>;

    abstract findRetros(): Nullable<Nullable<RetroListItem>[]> | Promise<Nullable<Nullable<RetroListItem>[]>>;

    abstract findRetro(_id: string): Nullable<Retro> | Promise<Nullable<Retro>>;

    abstract findUser(_id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract findUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract findUserInfo(): Nullable<User> | Promise<Nullable<User>>;

    abstract login(input?: Nullable<LoginUserInput>): Nullable<UserWithToken> | Promise<Nullable<UserWithToken>>;
}

export abstract class IMutation {
    abstract createComment(input?: Nullable<CreateCommentInput>): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract replyComment(input?: Nullable<ReplyCommentInput>): Nullable<Reply> | Promise<Nullable<Reply>>;

    abstract createNews(createNewsInput?: Nullable<CreateNewsInput>): Nullable<News> | Promise<Nullable<News>>;

    abstract createDynamic(input?: Nullable<CreateDynamicInput>): Nullable<Dynamic> | Promise<Nullable<Dynamic>>;

    abstract createLike(input?: Nullable<CreateLikeInput>): Nullable<Like> | Promise<Nullable<Like>>;

    abstract createRetroMessage(input?: Nullable<CreateRetroMessageInput>): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract updateRetroMessage(_id?: Nullable<string>, input?: Nullable<UpdateRetroMessageInput>): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract likeRetroMessage(_id?: Nullable<string>, count?: Nullable<number>): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract deleteRetroMessage(_id?: Nullable<string>): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract createOAuth(createOAuthInput?: Nullable<CreateOAuthInput>): Nullable<OAuth> | Promise<Nullable<OAuth>>;

    abstract createRetro(input?: Nullable<CreateRetroInput>): Nullable<Retro> | Promise<Nullable<Retro>>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract register(input?: Nullable<RegisterUserInput>): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
    abstract commentCreated(): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract newsCreated(): Nullable<News> | Promise<Nullable<News>>;

    abstract dynamicCreated(): Nullable<Dynamic> | Promise<Nullable<Dynamic>>;

    abstract likeCreated(): Nullable<Like> | Promise<Nullable<Like>>;

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
    object?: Nullable<string>;
    objectModel?: Nullable<CommentObjectUnionModel>;
    objectUnion?: Nullable<CommentObjectUnion>;
    user?: Nullable<User>;
    comments?: Nullable<Nullable<Reply>[]>;
    likeCount?: Nullable<number>;
    likeStatus?: Nullable<boolean>;
}

export class Reply {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    content?: Nullable<string>;
    object?: Nullable<string>;
    objectModel?: Nullable<CommentObjectUnionModel>;
    objectUnion?: Nullable<CommentObjectUnion>;
    user?: Nullable<User>;
    replyTo?: Nullable<Comment>;
    commentTo?: Nullable<Comment>;
    likeCount?: Nullable<number>;
    likeStatus?: Nullable<boolean>;
}

export class News {
    _id: string;
    title?: Nullable<string>;
    cover?: Nullable<string>;
    html?: Nullable<string>;
}

export class Dynamic implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    content?: Nullable<string>;
    pictures?: Nullable<string[]>;
    user: User;
}

export class Like implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    object?: Nullable<string>;
    objectModel?: Nullable<LikeObjectUnionModel>;
    objectUnion?: Nullable<LikeObjectUnion>;
    user?: Nullable<User>;
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
    anonymous?: Nullable<boolean>;
    pictures?: Nullable<string[]>;
}

export class OAuth {
    _id: string;
    platform?: Nullable<string>;
}

export class Retro implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    content?: Nullable<string>;
    title?: Nullable<string>;
    date?: Nullable<string>;
    user?: Nullable<User>;
    anonymous?: Nullable<boolean>;
}

export class RetroListItem implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    content?: Nullable<string>;
    title?: Nullable<string>;
    date?: Nullable<string>;
    user?: Nullable<User>;
    anonymous?: Nullable<boolean>;
    likeCount?: Nullable<number>;
    happyCount?: Nullable<number>;
    unhappyCount?: Nullable<number>;
    wonderringCount?: Nullable<number>;
    todoCount?: Nullable<number>;
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

export type CommentObjectUnion = News | Comment | RetroMessage;
export type LikeObjectUnion = News | Dynamic | Comment | RetroMessage;
type Nullable<T> = T | null;
