import {
  AlertBanner,
  Article,
  ArticleCategory,
  ArticleGroup,
  ArticleSubgroup,
  Author,
  Featured,
  FrontpageSlider,
  GenericPage,
  GroupedMenu,
  Homepage,
  Html,
  Image,
  LifeEventPage,
  Link,
  Menu,
  News,
  Page,
  SectionWithImage,
  Slice,
  SubArticle,
} from '../../types'
import { wysiwyg } from './richtext'
import {
  factory,
  slugify,
  simpleFactory,
  faker,
  title,
} from '@island.is/shared/mocking'
import { SystemMetadata } from '@island.is/shared/types'

export const image = factory<SystemMetadata<Image>>({
  typename: 'Image',
  width: 500,
  height: 500,
  id: () => faker.random.uuid(),
  url: () => faker.image.abstract(500, 500),
  contentType: 'img/jpeg',
  title: () => title(),
})

export const html = factory<Html>({
  typename: 'Html',
  id: () => faker.random.uuid(),
  document: () => wysiwyg(),
})

export const sectionWithImage = factory<SystemMetadata<SectionWithImage>>({
  typename: 'SectionWithImage',
  id: () => faker.random.uuid(),
  title: () => title(),
  html: () => html(),
  image: () => image(),
})

export const slice = simpleFactory(
  (): Slice => {
    const factory = faker.random.arrayElement([html, sectionWithImage])
    return factory()
  },
)

export const subArticle = factory<SubArticle>({
  id: () => faker.random.uuid(),
  title: () => title(),
  slug: slugify('title'),
  body: () => [slice()],
})

export const articleCategory = factory<ArticleCategory>({
  title: () => title(),
  slug: slugify('title'),
  id: () => faker.random.uuid(),
  description: () => faker.lorem.sentence(),
})

export const article = factory<SystemMetadata<Article>>({
  typename: 'Article',
  id: () => faker.random.uuid(),
  title: () => title(),
  body: () => slice.list(3),
  slug: slugify('title'),
  intro: () => faker.lorem.paragraph(),
  category: null,
  subArticles: () =>
    faker.random.number(4) === 0
      ? subArticle.list(faker.random.number({ min: 1, max: 4 }))
      : [],
  relatedArticles: () => [],
  group: null,
  subgroup: null,
})

export const lifeEvent = factory<LifeEventPage>({
  id: () => faker.random.uuid(),
  title: () => title(),
  slug: slugify('title'),
  intro: () => faker.lorem.paragraph(),
  content: () => slice.list(6),
  image: () => image(),
  thumbnail: () => image(),
})

export const link = factory<Link>({
  text: () => faker.lorem.words(),
  url: () => faker.internet.url(),
})

export const menu = factory<Menu>({
  id: faker.random.uuid(),
  title: () => title(),
  links: () => link.list(4),
  menuLinks: () => [],
})

export const groupedMenu = factory<GroupedMenu>({
  id: faker.random.uuid(),
  title: () => title(),
  menus: () => menu.list(2),
})

export const alertBannerVariant = () =>
  faker.random.arrayElement(['error', 'info', 'success', 'warning', 'default'])

export const alertBanner = factory<AlertBanner>({
  id: () => faker.random.uuid(),
  title: () => title(),
  description: () => faker.lorem.sentence(),
  isDismissable: () => faker.random.boolean(),
  dismissedForDays: 7,
  link: () => link(),
  bannerVariant: () => alertBannerVariant(),
  showAlertBanner: () => faker.random.boolean(),
})

export const author = factory<Author>({
  id: () => faker.random.uuid(),
  name: () => faker.name.findName(),
})

export const articleSubgroup = factory<ArticleSubgroup>({
  title: () => title(),
  slug: slugify('title'),
  importance: () => faker.random.number(),
})

export const articleGroup = factory<ArticleGroup>({
  title: () => title(),
  slug: slugify('title'),
  description: () => faker.lorem.sentence(),
})

export const news = factory<News>({
  id: () => faker.random.uuid(),
  title: () => title(),
  slug: slugify('title'),
  date: () => faker.date.past().toISOString(),
  intro: () => faker.lorem.paragraph(),
  subtitle: () => faker.lorem.sentence(),
  image: () => image(),
  content: () => slice.list(3),
  author: () => author(),
  genericTags: () => [],
})

export const frontPageSlider = factory<FrontpageSlider>({
  title: () => title(),
  subtitle: () => faker.lorem.sentence(),
  link: null,
  content: () => faker.lorem.paragraph(),
})

export const page = simpleFactory(
  (): Page => {
    const factory = faker.random.arrayElement([article, subArticle])
    return factory()
  },
)

export const featured = factory<Featured>({
  thing: () => page(),
  title: ({ thing }) => thing.title,
  attention: () => faker.random.boolean(),
})

export const homepage = factory<Homepage>({
  id: () => faker.random.uuid(),
  featuredThings: () => featured.list(3),
})

export const genericPage = factory<GenericPage>({
  slug: slugify('title'),
  title: () => title(),
})
