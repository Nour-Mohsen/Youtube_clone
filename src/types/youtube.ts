export type YouTubeThumbnail = {
    url: string
}

export type YouTubeThumbnails = {
    default?: YouTubeThumbnail
    medium?: YouTubeThumbnail
    high?: YouTubeThumbnail
}

export type YouTubeSnippet = {
    title: string
    channelTitle: string
    channelId: string
    categoryId: string
    publishedAt: string
    description: string
    thumbnails: YouTubeThumbnails
}

export type YouTubeStatistics = {
    viewCount?: string
    likeCount?: string
    commentCount?: string
    subscriberCount?: string
}

export type YouTubeVideoItem = {
    id: string
    snippet: YouTubeSnippet
    statistics?: YouTubeStatistics
}

export type YouTubeChannelItem = {
    snippet: {
        thumbnails: {
            default: YouTubeThumbnail
        }
    }
    statistics: {
        subscriberCount: string
    }
}

export type YouTubeCommentSnippet = {
    authorDisplayName: string
    authorProfileImageUrl: string
    publishedAt: string
    textDisplay: string
    likeCount?: string
}

export type YouTubeCommentThread = {
    snippet: {
        topLevelComment: {
            snippet: YouTubeCommentSnippet
        }
    }
}

export type YouTubeListResponse<T> = {
    items?: T[]
}

export type YouTubeSearchItem = {
    id: {
        videoId: string
    }
    snippet: {
        title: string
        channelTitle: string
        publishedAt: string
        thumbnails: YouTubeThumbnails
        categoryId?: string
    }
}
