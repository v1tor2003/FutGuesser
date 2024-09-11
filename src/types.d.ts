type Route = {
  path: string
  page: string
}

type Team = {
  id: number
  name: string
  shortName?: string
  tla?: string
  crest: string
  address?: string
  website?: string
  founded?: number
  clubColors?: string
  venue?: string
  lastUpdated?: Date
}

type TeamShort = Pick<Team, 'id', 'name', 'crest'>
