// YouTube Data API v3 helpers used by Feed, PlayVideo, and Recommended.

import { YOUTUBE_API_KEY } from '../config/api'
import type {
    YouTubeChannelItem,
    YouTubeCommentThread,
    YouTubeListResponse,
    YouTubeSearchItem,
    YouTubeVideoItem,
} from '../types/youtube'

const BASE_URL = 'https://youtube.googleapis.com/youtube/v3'

export async function fetchPopularVideos(sidebarCategoryId: number): Promise<YouTubeVideoItem[]> {
    const categoryParam = sidebarCategoryId === 0 ? '' : `&videoCategoryId=${sidebarCategoryId}`
    const url = `${BASE_URL}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US${categoryParam}&key=${YOUTUBE_API_KEY}`
    const response = await fetch(url)
    const result: YouTubeListResponse<YouTubeVideoItem> = await response.json()
    return result.items ?? []
}

export async function searchVideos(query: string): Promise<YouTubeVideoItem[]> {
    const searchUrl = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=50&key=${YOUTUBE_API_KEY}`
    const searchResponse = await fetch(searchUrl)
    const searchResult: YouTubeListResponse<YouTubeSearchItem> = await searchResponse.json()

    if (!searchResult.items?.length) return []

    const videoIds = searchResult.items.map(item => item.id.videoId).join(',')
    const detailsUrl = `${BASE_URL}/videos?part=snippet,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    const detailsResponse = await fetch(detailsUrl)
    const detailsResult: YouTubeListResponse<YouTubeVideoItem> = await detailsResponse.json()
    return detailsResult.items ?? []
}

export async function fetchVideoById(videoId: string): Promise<YouTubeVideoItem | null> {
    const url = `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
    const response = await fetch(url)
    const result: YouTubeListResponse<YouTubeVideoItem> = await response.json()
    return result.items?.[0] ?? null
}

export async function fetchChannelById(channelId: string): Promise<YouTubeChannelItem | null> {
    const url = `${BASE_URL}/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`
    const response = await fetch(url)
    const result: YouTubeListResponse<YouTubeChannelItem> = await response.json()
    return result.items?.[0] ?? null
}

export async function fetchComments(videoId: string): Promise<YouTubeCommentThread[]> {
    const url = `${BASE_URL}/commentThreads?part=snippet,replies&videoId=${videoId}&key=${YOUTUBE_API_KEY}`
    const response = await fetch(url)
    const result: YouTubeListResponse<YouTubeCommentThread> = await response.json()
    return result.items ?? []
}

export async function fetchRelatedVideos(categoryId: string): Promise<YouTubeVideoItem[]> {
    const url = `${BASE_URL}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=20&videoCategoryId=${categoryId}&key=${YOUTUBE_API_KEY}`
    const response = await fetch(url)
    const result: YouTubeListResponse<YouTubeVideoItem> = await response.json()
    return result.items ?? []
}
