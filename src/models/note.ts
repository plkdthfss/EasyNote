export interface Note {
  id: string
  title: string
  content: string
  category: string
  timestamp: number
  isFavorite: boolean
  tags?: string[]
}

export type TabType = 'all' | 'favorites' | 'pinned'
