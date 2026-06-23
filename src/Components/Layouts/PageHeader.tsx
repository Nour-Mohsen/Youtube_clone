import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react"
import logo from "../../assets/logo.png"
import { Button } from "../Button"
import { FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSidebarContext } from "../Sidebar/SidebarContext"

type PageHeaderProps = {
    searchQuery: string
    onSearch: (query: string) => void
}

export function PageHeader({ searchQuery, onSearch }: PageHeaderProps) {
    const navigate = useNavigate()
    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false)
    const [inputValue, setInputValue] = useState(searchQuery)

    useEffect(() => {
        setInputValue(searchQuery)
    }, [searchQuery])

    const runSearch = () => {
        const query = inputValue.trim()
        if (!query) return

        onSearch(query)
        navigate('/')
        setShowFullWidthSearch(false)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        runSearch()
    }

    return (
        <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
            <PageHeaderFirstSection hidden={showFullWidthSearch} />
            <form
                onSubmit={handleSubmit}
                className={`gap-4 flex-grow justify-center ${showFullWidthSearch ? "flex" : "hidden md:flex"
                    }`}
            >
                {showFullWidthSearch && (
                    <Button
                        onClick={() => setShowFullWidthSearch(false)}
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="flex-shrink-0"
                    >
                        <ArrowLeft />
                    </Button>
                )}
                <div className="flex flex-grow max-w-[600px]">
                    <input
                        type="search"
                        placeholder="Search"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
                    />
                    <Button
                        type="submit"
                        aria-label="Search"
                        className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0"
                    >
                        <Search />
                    </Button>
                </div>
                <Button type="button" size="icon" className="flex-shrink-0">
                    <Mic />
                </Button>
            </form>
            <div
                className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"
                    }`}
            >
                <Button
                    onClick={() => setShowFullWidthSearch(true)}
                    size="icon"
                    variant="ghost"
                    className="md:hidden"
                >
                    <Search />
                </Button>
                <Button size="icon" variant="ghost" className="md:hidden">
                    <Mic />
                </Button>
                <Button size="icon" variant="ghost">
                    <Upload />
                </Button>
                <Button size="icon" variant="ghost">
                    <Bell />
                </Button>
                <Button size="icon" variant="ghost">
                    <User />
                </Button>
            </div>
        </div>
    )
}

type PageHeaderFirstSectionProps = {
    hidden?: boolean
}

export function PageHeaderFirstSection({
    hidden = false,
}: PageHeaderFirstSectionProps) {
    const { toggle } = useSidebarContext()

    return (
        <div
            className={`gap-4 items-center flex-shrink-0 ${hidden ? "hidden" : "flex"
                }`}
        >
            <Button onClick={toggle} variant="ghost" size="icon">
                <Menu />
            </Button>
            <Link to="/">
                <img src={logo} className="h-6" />
            </Link>
        </div>
    )
}
