
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

export class CreateDynamicInput {
    content?: Nullable<string>;
    pictures?: Nullable<string[]>;
}

export class CreateFollowInput {
    to: string;
}

export class CreateHashtagInput {
    category?: Nullable<string>;
    name: string;
    cover?: Nullable<string>;
    icon?: Nullable<string>;
}

export class CreateInterestInput {
    category?: Nullable<string>;
    name: string;
    cover?: Nullable<string>;
    icon?: Nullable<string>;
}

export class CreateLikeInput {
    object: string;
    objectModel: LikeObjectUnionModel;
}

export class CreateNewsInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class CreateOAuthInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class CreateOrganizationInput {
    name: string;
    description?: Nullable<string>;
    logo?: Nullable<string>;
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

export class CreateRetroInput {
    content?: Nullable<string>;
    title?: Nullable<string>;
    date?: Nullable<string>;
    anonymous?: Nullable<boolean>;
}

export class CreateRoleInput {
    scope: string;
    name: string;
    description?: Nullable<string>;
}

export class CreateScheduleInput {
    user?: Nullable<string>;
    date: number;
    status: string;
    comment?: Nullable<string>;
}

export class CreateSeatInput {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    cover?: Nullable<string>;
    icon?: Nullable<string>;
}

export class UpdateSeatInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    cover?: Nullable<string>;
    icon?: Nullable<string>;
    tags?: Nullable<Nullable<string>[]>;
    status?: Nullable<string>;
    disabled?: Nullable<boolean>;
}

export class CreateTopicInput {
    category?: Nullable<string>;
    name: string;
    cover?: Nullable<string>;
    icon?: Nullable<string>;
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

export class UpdateUserInfoInput {
    avatarUrl?: Nullable<string>;
    nickname?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    sign?: Nullable<string>;
    sex?: Nullable<number>;
    birthday?: Nullable<string>;
    position?: Nullable<string>;
    company?: Nullable<string>;
}

export class AdminUpdateUserInfoInput {
    nickname?: Nullable<string>;
    index?: Nullable<string>;
    tags?: Nullable<Nullable<string>[]>;
}

export class OrganizationInviteUserInput {
    user: string;
    organization: string;
}

export class OrganizationRemoveUserInput {
    user: string;
    organization: string;
}

export class CreateUserToRoleInput {
    user: string;
    role: string;
    scope: string;
}

export class ToggleUserToSeatInput {
    user: string;
    seat: string;
    date: number;
}

export class CreateUserToSeatInput {
    seat?: Nullable<string>;
    date?: Nullable<number>;
}

export class DeleteUserToSeatInput {
    seat?: Nullable<string>;
    date?: Nullable<number>;
}

export interface Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class Result {
    success?: Nullable<boolean>;
    message?: Nullable<string>;
}

export abstract class IQuery {
    abstract findComments(object: string): Nullable<Nullable<Comment>[]> | Promise<Nullable<Nullable<Comment>[]>>;

    abstract findComment(_id: string): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract findDynamics(): Nullable<Nullable<Dynamic>[]> | Promise<Nullable<Nullable<Dynamic>[]>>;

    abstract findDynamic(_id: string): Nullable<Dynamic> | Promise<Nullable<Dynamic>>;

    abstract findFollows(): Nullable<Nullable<Follow>[]> | Promise<Nullable<Nullable<Follow>[]>>;

    abstract findFollow(_id: string): Nullable<Follow> | Promise<Nullable<Follow>>;

    abstract findHashtags(): Nullable<Nullable<Hashtag>[]> | Promise<Nullable<Nullable<Hashtag>[]>>;

    abstract findHashtag(_id: string): Nullable<Hashtag> | Promise<Nullable<Hashtag>>;

    abstract findInterests(): Nullable<Nullable<Interest>[]> | Promise<Nullable<Nullable<Interest>[]>>;

    abstract findInterest(_id: string): Nullable<Interest> | Promise<Nullable<Interest>>;

    abstract findLikes(object: string): Nullable<Nullable<Like>[]> | Promise<Nullable<Nullable<Like>[]>>;

    abstract findLike(_id: string): Nullable<Like> | Promise<Nullable<Like>>;

    abstract newsList(): Nullable<Nullable<News>[]> | Promise<Nullable<Nullable<News>[]>>;

    abstract news(_id: string): Nullable<News> | Promise<Nullable<News>>;

    abstract oauths(): Nullable<Nullable<OAuth>[]> | Promise<Nullable<Nullable<OAuth>[]>>;

    abstract oauth(_id: string): Nullable<OAuth> | Promise<Nullable<OAuth>>;

    abstract findOrganizations(): Nullable<Nullable<Organization>[]> | Promise<Nullable<Nullable<Organization>[]>>;

    abstract findOrganization(_id: string): Nullable<Organization> | Promise<Nullable<Organization>>;

    abstract findRetroMessages(retro?: Nullable<string>): Nullable<Nullable<RetroMessage>[]> | Promise<Nullable<Nullable<RetroMessage>[]>>;

    abstract findRetroMessage(_id: string): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract findRetros(page?: Nullable<number>, pageSize?: Nullable<number>): Nullable<Nullable<RetroListItem>[]> | Promise<Nullable<Nullable<RetroListItem>[]>>;

    abstract findRetro(_id: string): Nullable<Retro> | Promise<Nullable<Retro>>;

    abstract findRoles(): Nullable<Nullable<UserRole>[]> | Promise<Nullable<Nullable<UserRole>[]>>;

    abstract findRole(_id: string): Nullable<UserRole> | Promise<Nullable<UserRole>>;

    abstract findSchedules(startDate?: Nullable<number>, endDate?: Nullable<number>, user?: Nullable<string>): Nullable<Nullable<Schedule>[]> | Promise<Nullable<Nullable<Schedule>[]>>;

    abstract findSchedule(_id: string): Nullable<Schedule> | Promise<Nullable<Schedule>>;

    abstract findSeats(): Nullable<Nullable<Seat>[]> | Promise<Nullable<Nullable<Seat>[]>>;

    abstract findSeat(_id: string): Nullable<Seat> | Promise<Nullable<Seat>>;

    abstract findTopics(): Nullable<Nullable<Topic>[]> | Promise<Nullable<Nullable<Topic>[]>>;

    abstract findTopic(_id: string): Nullable<Topic> | Promise<Nullable<Topic>>;

    abstract findUser(_id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract findUsers(search?: Nullable<string>, tags?: Nullable<Nullable<string>[]>, limit?: Nullable<number>, skip?: Nullable<number>, sortKey?: Nullable<string>, sortOrder?: Nullable<number>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract findUserInfo(): Nullable<User> | Promise<Nullable<User>>;

    abstract login(input?: Nullable<LoginUserInput>): Nullable<UserWithToken> | Promise<Nullable<UserWithToken>>;

    abstract myOrganizations(): Nullable<Nullable<Organization>[]> | Promise<Nullable<Nullable<Organization>[]>>;

    abstract currentOrganization(): Nullable<Organization> | Promise<Nullable<Organization>>;

    abstract currentOrganizationUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract userToOrganizations(user?: Nullable<string>, organization?: Nullable<string>): Nullable<Nullable<UserToOrganization>[]> | Promise<Nullable<Nullable<UserToOrganization>[]>>;

    abstract userToOrganization(_id: string): Nullable<UserToOrganization> | Promise<Nullable<UserToOrganization>>;

    abstract findSeatSelectionUsers(limit?: Nullable<number>, skip?: Nullable<number>, role?: Nullable<string>, user?: Nullable<string>): Nullable<Nullable<UserWithRole>[]> | Promise<Nullable<Nullable<UserWithRole>[]>>;

    abstract findUserToRoles(): Nullable<Nullable<UserToRole>[]> | Promise<Nullable<Nullable<UserToRole>[]>>;

    abstract findUserToRole(_id: string): Nullable<UserToRole> | Promise<Nullable<UserToRole>>;

    abstract findUserToSeats(startDate?: Nullable<number>, endDate?: Nullable<number>, seat?: Nullable<string>, user?: Nullable<string>): Nullable<Nullable<UserToSeat>[]> | Promise<Nullable<Nullable<UserToSeat>[]>>;

    abstract findUserToSeat(_id: string): Nullable<UserToSeat> | Promise<Nullable<UserToSeat>>;
}

export abstract class IMutation {
    abstract createComment(input?: Nullable<CreateCommentInput>): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract replyComment(input?: Nullable<ReplyCommentInput>): Nullable<Reply> | Promise<Nullable<Reply>>;

    abstract createDynamic(input?: Nullable<CreateDynamicInput>): Nullable<Dynamic> | Promise<Nullable<Dynamic>>;

    abstract createFollow(input?: Nullable<CreateFollowInput>): Nullable<Follow> | Promise<Nullable<Follow>>;

    abstract createHashtag(input?: Nullable<CreateHashtagInput>): Nullable<Hashtag> | Promise<Nullable<Hashtag>>;

    abstract createInterest(input?: Nullable<CreateInterestInput>): Nullable<Interest> | Promise<Nullable<Interest>>;

    abstract createLike(input?: Nullable<CreateLikeInput>): Nullable<Like> | Promise<Nullable<Like>>;

    abstract createNews(createNewsInput?: Nullable<CreateNewsInput>): Nullable<News> | Promise<Nullable<News>>;

    abstract createOAuth(createOAuthInput?: Nullable<CreateOAuthInput>): Nullable<OAuth> | Promise<Nullable<OAuth>>;

    abstract createRetroMessage(input?: Nullable<CreateRetroMessageInput>): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract updateRetroMessage(_id?: Nullable<string>, input?: Nullable<UpdateRetroMessageInput>): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract likeRetroMessage(_id?: Nullable<string>, count?: Nullable<number>): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract deleteRetroMessage(_id?: Nullable<string>): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract createRetro(input?: Nullable<CreateRetroInput>): Nullable<Retro> | Promise<Nullable<Retro>>;

    abstract createRole(input?: Nullable<CreateRoleInput>): Nullable<UserRole> | Promise<Nullable<UserRole>>;

    abstract createSchedule(input?: Nullable<CreateScheduleInput>): Nullable<Schedule> | Promise<Nullable<Schedule>>;

    abstract createSeat(input?: Nullable<CreateSeatInput>): Nullable<Seat> | Promise<Nullable<Seat>>;

    abstract updateSeat(id?: Nullable<string>, input?: Nullable<UpdateSeatInput>): Nullable<Result> | Promise<Nullable<Result>>;

    abstract setSeatsTags(ids?: Nullable<Nullable<string>[]>, tags?: Nullable<Nullable<string>[]>): Nullable<Result> | Promise<Nullable<Result>>;

    abstract pushSeatsTags(ids?: Nullable<Nullable<string>[]>, tags?: Nullable<Nullable<string>[]>): Nullable<Result> | Promise<Nullable<Result>>;

    abstract pullSeatsTags(ids?: Nullable<Nullable<string>[]>, tags?: Nullable<Nullable<string>[]>): Nullable<Result> | Promise<Nullable<Result>>;

    abstract createTopic(input?: Nullable<CreateTopicInput>): Nullable<Topic> | Promise<Nullable<Topic>>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract register(input?: Nullable<RegisterUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUserInfo(input?: Nullable<UpdateUserInfoInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract adminUpdateUserInfo(id?: Nullable<string>, input?: Nullable<AdminUpdateUserInfoInput>): Nullable<Result> | Promise<Nullable<Result>>;

    abstract adminPushUsersTags(users?: Nullable<Nullable<string>[]>, tags?: Nullable<Nullable<string>[]>): Nullable<Result> | Promise<Nullable<Result>>;

    abstract adminPullUsersTags(users?: Nullable<Nullable<string>[]>, tags?: Nullable<Nullable<string>[]>): Nullable<Result> | Promise<Nullable<Result>>;

    abstract createOrganization(input?: Nullable<CreateOrganizationInput>): Nullable<Organization> | Promise<Nullable<Organization>>;

    abstract organizationInviteUser(input?: Nullable<OrganizationInviteUserInput>): Nullable<UserToOrganization> | Promise<Nullable<UserToOrganization>>;

    abstract organizationRemoveUser(input?: Nullable<OrganizationRemoveUserInput>): Nullable<UserToOrganization> | Promise<Nullable<UserToOrganization>>;

    abstract createUserToRole(input?: Nullable<CreateUserToRoleInput>): Nullable<UserToRole> | Promise<Nullable<UserToRole>>;

    abstract createUserToSeat(input?: Nullable<CreateUserToSeatInput>): Nullable<UserToSeat> | Promise<Nullable<UserToSeat>>;

    abstract deleteUserToSeat(input?: Nullable<DeleteUserToSeatInput>): Nullable<UserToSeat> | Promise<Nullable<UserToSeat>>;

    abstract toggleUserToSeat(input?: Nullable<ToggleUserToSeatInput>): Nullable<UserToSeat> | Promise<Nullable<UserToSeat>>;
}

export abstract class ISubscription {
    abstract commentCreated(): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract dynamicCreated(): Nullable<Dynamic> | Promise<Nullable<Dynamic>>;

    abstract followCreated(): Nullable<Follow> | Promise<Nullable<Follow>>;

    abstract hashtagCreated(): Nullable<Hashtag> | Promise<Nullable<Hashtag>>;

    abstract interestCreated(): Nullable<Interest> | Promise<Nullable<Interest>>;

    abstract likeCreated(): Nullable<Like> | Promise<Nullable<Like>>;

    abstract newsCreated(): Nullable<News> | Promise<Nullable<News>>;

    abstract organizationCreated(): Nullable<Organization> | Promise<Nullable<Organization>>;

    abstract retroMessageCreated(): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract retroMessageUpdated(): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract retroMessageDeleted(): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract retroMessageLiked(): Nullable<RetroMessage> | Promise<Nullable<RetroMessage>>;

    abstract retroCreated(): Nullable<Retro> | Promise<Nullable<Retro>>;

    abstract roleCreated(): Nullable<UserRole> | Promise<Nullable<UserRole>>;

    abstract scheduleCreated(startDate?: Nullable<number>, endDate?: Nullable<number>, user?: Nullable<string>): Nullable<Schedule> | Promise<Nullable<Schedule>>;

    abstract seatCreated(): Nullable<Seat> | Promise<Nullable<Seat>>;

    abstract topicCreated(): Nullable<Topic> | Promise<Nullable<Topic>>;

    abstract userToOrganizationCreated(): Nullable<UserToOrganization> | Promise<Nullable<UserToOrganization>>;

    abstract userToRoleCreated(): Nullable<UserToRole> | Promise<Nullable<UserToRole>>;

    abstract userToSeatCreated(startDate?: Nullable<number>, endDate?: Nullable<number>, seat?: Nullable<string>, user?: Nullable<string>): Nullable<UserToSeat> | Promise<Nullable<UserToSeat>>;

    abstract userToSeatDeleted(startDate?: Nullable<number>, endDate?: Nullable<number>, seat?: Nullable<string>, user?: Nullable<string>): Nullable<UserToSeat> | Promise<Nullable<UserToSeat>>;
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
    likeCount?: Nullable<number>;
    likeStatus?: Nullable<boolean>;
    comments?: Nullable<Nullable<Reply>[]>;
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
    likeCount?: Nullable<number>;
    likeStatus?: Nullable<boolean>;
    replyTo?: Nullable<Comment>;
    commentTo?: Nullable<Comment>;
}

export class Dynamic implements Document {
    _id: string;
    createdAt: string;
    updatedAt: string;
    content?: Nullable<string>;
    pictures?: Nullable<string[]>;
    user: User;
    likeCount?: Nullable<number>;
    likeStatus?: Nullable<boolean>;
    commentCount?: Nullable<number>;
    shareCount?: Nullable<number>;
}

export class Follow implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    from?: Nullable<User>;
    to?: Nullable<User>;
}

export class Hashtag implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    user?: Nullable<User>;
    category?: Nullable<string>;
    name?: Nullable<string>;
    cover?: Nullable<string>;
    icon?: Nullable<string>;
}

export class Interest implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    user?: Nullable<User>;
    category?: Nullable<string>;
    name?: Nullable<string>;
    cover?: Nullable<string>;
    icon?: Nullable<string>;
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

export class Organization implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    owner: User;
    name?: Nullable<string>;
    description?: Nullable<string>;
    logo?: Nullable<string>;
}

export class RetroMessage implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    content?: Nullable<string>;
    anonymous?: Nullable<boolean>;
    status?: Nullable<RetroMessageStatus>;
    type?: Nullable<RetroMessageType>;
    user?: Nullable<User>;
    like?: Nullable<number>;
    pictures?: Nullable<string[]>;
    comments?: Nullable<Comment[]>;
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

export class UserRole implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    scope: string;
    name: string;
    description?: Nullable<string>;
}

export class Schedule implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    user?: Nullable<User>;
    status?: Nullable<string>;
    comment?: Nullable<string>;
    date?: Nullable<number>;
}

export class Seat implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    cover?: Nullable<string>;
    icon?: Nullable<string>;
    tags?: Nullable<Nullable<string>[]>;
    status?: Nullable<string>;
    disabled?: Nullable<boolean>;
}

export class Topic implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    user?: Nullable<User>;
    category?: Nullable<string>;
    name?: Nullable<string>;
    cover?: Nullable<string>;
    icon?: Nullable<string>;
}

export class UserWithToken {
    token: string;
    user: User;
}

export class User {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    username?: Nullable<string>;
    nickname?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    avatarUrl?: Nullable<string>;
    sex?: Nullable<number>;
    sign?: Nullable<string>;
    birthday?: Nullable<string>;
    position?: Nullable<string>;
    company?: Nullable<string>;
    tags?: Nullable<Nullable<string>[]>;
    index?: Nullable<number>;
}

export class UserToOrganization implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    isCurrent?: Nullable<boolean>;
    user: User;
    organization: Organization;
}

export class UserToRole implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    user: User;
    role: UserRole;
    scope: string;
}

export class UserWithRole {
    _id: string;
    username?: Nullable<string>;
    nickname?: Nullable<string>;
    avatarUrl?: Nullable<string>;
    roles?: Nullable<Nullable<UserRole>[]>;
}

export class UserToSeat implements Document {
    _id: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    user?: Nullable<User>;
    seat?: Nullable<Seat>;
    date?: Nullable<number>;
    cancel?: Nullable<boolean>;
}

export type CommentObjectUnion = News | Comment | RetroMessage;
export type LikeObjectUnion = News | Dynamic | Comment | RetroMessage;
type Nullable<T> = T | null;
