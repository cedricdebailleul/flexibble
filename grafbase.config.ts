import {config, connector, graph } from '@grafbase/sdk'

const g = graph.Standalone()

const pg = connector.Postgres('pg', {
  url: g.env('DATABASE_URL'),
})

g.datasource(pg)

// @ts-ignore
const user = g.type('User', {
  id: g.id(),
  name: g.string().optional(),
  email: g.string(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(),
})

// @ts-ignore
pg.model('User', {
  name: g.string().length({min: 2, max: 100}),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({ min: 2, max: 1000}).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(),
}).collection('users')
.auth((rules: any) => {
  rules.public().read()
})

// @ts-ignore
pg.model('Project', {
  title: g.string().length({min: 3}),
  description: g.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string(),
  createdBy: g.ref(user),
})
.collection('projects')
.auth((rules: any) => {
  rules.public().read()
  rules.private().create().delete().update()
})

export default config({
  graph: g,
})