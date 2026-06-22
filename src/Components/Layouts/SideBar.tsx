import {
    ChevronDown,
    ChevronUp,
    Clapperboard,
    Clock,
    Home,
    Library,
    PlaySquare,
    Repeat,
    History,
    ListVideo,
    Flame,
    ShoppingBag,
    Music2,
    Film,
    Radio,
    Gamepad2,
    Newspaper,
    Trophy,
    Lightbulb,
    Shirt,
    Podcast,
} from "lucide-react"
import { Children, ElementType, ReactNode, useState } from "react"
import { Link } from "react-router-dom"
import { Button, buttonStyles } from "../Button"
import { twMerge } from "tailwind-merge"
import { playlists, subscriptions } from "../data/sidebar"
import { useSidebarContext } from "../Sidebar/SidebarContext"
import { PageHeaderFirstSection } from "./PageHeader"

type SideBarProps = {
    sidebarCategoryId: number
    onSidebarCategoryChange: (id: number) => void
}

export function SideBar({ sidebarCategoryId, onSidebarCategoryChange }: SideBarProps) {
    const { isLargeOpen, isSmallOpen, close } = useSidebarContext()

    return (
        <>
            <aside
                className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col ml-1 hidden md:flex ${isLargeOpen ? "lg:hidden" : "lg:flex"
                    }`}
            >
                <SmallSidebarItem Icon={Home} title="Home" onClick={() => onSidebarCategoryChange(0)} />
                <SmallSidebarItem Icon={Repeat} title="Shorts" />
                <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" />
                <SmallSidebarItem Icon={Library} title="Library" />
            </aside>
            {isSmallOpen && (
                <div
                    onClick={close}
                    className="lg:hidden fixed inset-0 z-10 bg-secondary-dark opacity-50"
                />
            )}
            <aside
                className={`w-56 shrink-0 lg:sticky fixed inset-y-0 left-0 h-screen overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${isLargeOpen ? "lg:flex" : "lg:hidden"
                    } ${isSmallOpen ? "flex z-50 bg-white shadow-xl" : "hidden"}`}
            >
                <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                    <PageHeaderFirstSection />
                </div>
                <LargeSidebarSection>
                    <LargeSidebarItem isActive={sidebarCategoryId === 0} onClick={() => onSidebarCategoryChange(0)} IconOrImgUrl={Home} title="Home" />
                    <LargeSidebarItem IconOrImgUrl={Clapperboard} title="Subscriptions" />
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection visibleItemCount={5}>
                    <LargeSidebarItem IconOrImgUrl={Library} title="Library" />
                    <LargeSidebarItem IconOrImgUrl={History} title="History" />
                    <LargeSidebarItem IconOrImgUrl={PlaySquare} title="Your Videos" />
                    <LargeSidebarItem IconOrImgUrl={Clock} title="Watch Later" />
                    {playlists.map(playlist => (
                        <LargeSidebarItem
                            key={playlist.id}
                            IconOrImgUrl={ListVideo}
                            title={playlist.name}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Subscriptions">
                    {subscriptions.map(subscription => (
                        <LargeSidebarItem
                            key={subscription.id}
                            IconOrImgUrl={subscription.imgUrl}
                            title={subscription.channelName}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection title="Explore">
                    <LargeSidebarItem
                        isActive={sidebarCategoryId === 12}
                        onClick={() => onSidebarCategoryChange(12)}
                        IconOrImgUrl={Flame}
                        title="Trending"
                    />
                    <LargeSidebarItem IconOrImgUrl={ShoppingBag} title="Shopping" />
                    <LargeSidebarItem isActive={sidebarCategoryId === 10} onClick={() => onSidebarCategoryChange(10)} IconOrImgUrl={Music2} title="Music" />
                    <LargeSidebarItem
                        isActive={sidebarCategoryId === 24}
                        onClick={() => onSidebarCategoryChange(24)}
                        IconOrImgUrl={Film}
                        title="Movies & TV"
                    />
                    <LargeSidebarItem IconOrImgUrl={Radio} title="Live" />
                    <LargeSidebarItem
                        isActive={sidebarCategoryId === 20}
                        onClick={() => onSidebarCategoryChange(20)}
                        IconOrImgUrl={Gamepad2}
                        title="Gaming"
                    />
                    <LargeSidebarItem isActive={sidebarCategoryId === 25} onClick={() => onSidebarCategoryChange(25)} IconOrImgUrl={Newspaper} title="News" />
                    <LargeSidebarItem
                        isActive={sidebarCategoryId === 17}
                        onClick={() => onSidebarCategoryChange(17)}
                        IconOrImgUrl={Trophy}
                        title="Sports"
                    />
                    <LargeSidebarItem IconOrImgUrl={Lightbulb} title="Learning" />
                    <LargeSidebarItem IconOrImgUrl={Shirt} title="Fashion & Beauty" />
                    <LargeSidebarItem IconOrImgUrl={Podcast} title="Podcasts" />
                </LargeSidebarSection>
            </aside>
        </>
    )
}

type SmallSidebarItemProps = {
    Icon: ElementType
    title: string
    onClick?: () => void
}

function SmallSidebarItem({ Icon, title, onClick }: SmallSidebarItemProps) {
    return (
        <Link
            to="/"
            onClick={() => onClick?.()}
            className={twMerge(
                buttonStyles({ variant: "ghost" }),
                "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
            )}
        >
            <Icon className="w-6 h-6" />
            <div className="text-sm">{title}</div>
        </Link>
    )
}

type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function LargeSidebarSection({
    children,
    title,
    visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = Children.toArray(children).flat()
    const showExpandButton = childrenArray.length > visibleItemCount
    const visibleChildren = isExpanded
        ? childrenArray
        : childrenArray.slice(0, visibleItemCount)
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown

    return (
        <div>
            {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
            {visibleChildren}
            {showExpandButton && (
                <Button
                    onClick={() => setIsExpanded(e => !e)}
                    variant="ghost"
                    className="w-full flex items-center rounded-lg gap-4 p-3"
                >
                    <ButtonIcon className="w-6 h-6" />
                    <div>{isExpanded ? "Show Less" : "Show More"}</div>
                </Button>
            )}
        </div>
    )
}

type LargeSidebarItemProps = {
    IconOrImgUrl: ElementType | string
    title: string
    isActive?: boolean
    onClick?: () => void
}

function LargeSidebarItem({
    IconOrImgUrl,
    title,
    isActive = false,
    onClick,
}: LargeSidebarItemProps) {
    const { close, isSmallOpen } = useSidebarContext()

    return (
        <Link
            to="/"
            onClick={() => {
                onClick?.()
                if (isSmallOpen) close()
            }}
            className={twMerge(
                buttonStyles({ variant: "ghost" }),
                `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
                }`
            )}
        >
            {typeof IconOrImgUrl === "string" ? (
                <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
            ) : (
                <IconOrImgUrl className="w-6 h-6" />
            )}
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
            </div>
        </Link>
    )
}