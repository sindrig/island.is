import { Args, Query, Resolver, ResolveField } from '@nestjs/graphql'
import { Article } from './models/article.model'
import { AdgerdirPage } from './models/adgerdirPage.model'
import { AdgerdirPages } from './models/adgerdirPages.model'
import { AdgerdirFrontpage } from './models/adgerdirFrontpage.model'
import { GetArticleInput } from './dto/getArticle.input'
import { News } from './models/news.model'
import { GetNewsInput } from './dto/getNews.input'
import { GetNewsListInput } from './dto/getNewsList.input'
import { GetAdgerdirPageInput } from './dto/getAdgerdirPage.input'
import { GetAdgerdirPagesInput } from './dto/getAdgerdirPages.input'
import { GetAdgerdirFrontpageInput } from './dto/getAdgerdirFrontpage.input'
import { PaginatedNews } from './models/paginatedNews.model'
import { Namespace } from './models/namespace.model'
import { AboutPage } from './models/aboutPage.model'
import { LandingPage } from './models/landingPage.model'
import { GetNamespaceInput } from './dto/getNamespace.input'
import { GetAboutPageInput } from './dto/getAboutPage.input'
import { GetLandingPageInput } from './dto/getLandingPage.input'
import {
  getArticle,
  getNews,
  getNewsList,
  getNamespace,
  getAboutPage,
  getLandingPage,
  getAdgerdirPage,
  getAdgerdirPages,
  getAdgerdirFrontpage,
} from './services'
import { LatestNewsSlice } from './models/slices/latestNewsSlice.model'

@Resolver()
export class CmsResolver {
  @Query(() => Article, { nullable: true })
  getArticle(@Args('input') input: GetArticleInput): Promise<Article | null> {
    return getArticle(input?.slug ?? '', input?.lang ?? 'is-IS')
  }

  @Query(() => News, { nullable: true })
  getNews(@Args('input') input: GetNewsInput): Promise<News | null> {
    return getNews(input.lang ?? 'is-IS', input.slug)
  }

  @Query(() => PaginatedNews)
  getNewsList(@Args('input') input: GetNewsListInput): Promise<PaginatedNews> {
    return getNewsList(input)
  }

  @Query(() => Namespace, { nullable: true })
  getNamespace(
    @Args('input') input: GetNamespaceInput,
  ): Promise<Namespace | null> {
    return getNamespace(input?.namespace ?? '', input?.lang ?? 'is-IS')
  }

  @Query(() => AboutPage, { nullable: true })
  getAboutPage(
    @Args('input') input: GetAboutPageInput,
  ): Promise<AboutPage | null> {
    return getAboutPage(input)
  }

  @Query(() => LandingPage, { nullable: true })
  getLandingPage(
    @Args('input') input: GetLandingPageInput,
  ): Promise<LandingPage | null> {
    return getLandingPage(input)
  }

  @Query(() => AdgerdirPage, { nullable: true })
  getAdgerdirPage(
    @Args('input') input: GetAdgerdirPageInput,
  ): Promise<AdgerdirPage | null> {
    return getAdgerdirPage(input?.slug ?? '', input?.lang ?? 'is-IS')
  }

  @Query(() => AdgerdirPages, { nullable: true })
  getAdgerdirPages(
    @Args('input') input: GetAdgerdirPagesInput,
  ): Promise<AdgerdirPages | null> {
    return getAdgerdirPages(input?.lang ?? 'is-IS')
  }

  @Query(() => AdgerdirFrontpage, { nullable: true })
  getAdgerdirFrontpage(
    @Args('input') input: GetAdgerdirFrontpageInput,
  ): Promise<AdgerdirPage | null> {
    return getAdgerdirFrontpage(input?.lang ?? 'is-IS')
  }
}

@Resolver((of) => LatestNewsSlice)
export class LatestNewsSliceResolver {
  @ResolveField(() => [News])
  async news() {
    const { news } = await getNewsList({ lang: 'is', perPage: 3 })
    return news
  }
}