
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateNewsInput {
    name?: string;
    age?: number;
}

export class Author {
    id: number;
    firstName?: string;
    lastName?: string;
    posts?: Post[];
}

export class Post {
    id: number;
    title: string;
    votes?: number;
}

export abstract class IQuery {
    abstract author(id: number): Author | Promise<Author>;

    abstract newsList(): News[] | Promise<News[]>;

    abstract news(id: string): News | Promise<News>;
}

export abstract class IMutation {
    abstract createNews(createNewsInput?: CreateNewsInput): News | Promise<News>;
}

export abstract class ISubscription {
    abstract newsCreated(): News | Promise<News>;
}

export class Owner {
    id: number;
    name: string;
    age?: number;
    news?: News[];
}

export class News {
    _id?: string;
    title?: string;
}
