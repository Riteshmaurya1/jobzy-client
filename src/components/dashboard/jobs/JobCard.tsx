import { useState, useRef, useEffect } from "react"
import { Building2, MapPin, Calendar, MoreVertical, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Job } from "@/services/jobsService"
import { format } from "date-fns"

interface JobCardProps {
    job: Job
    onEdit: (job: Job) => void
    onDelete: (id: string) => void
}

export function JobCard({ job, onEdit, onDelete }: JobCardProps) {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'applied':
                return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
            case 'screening':
                return 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800'
            case 'interview-scheduled':
            case 'interview':
                return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800'
            case 'offer':
                return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800'
            case 'rejected':
                return 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
            default:
                return 'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700'
        }
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="group relative flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900 dark:border-neutral-800">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700">
                        <Building2 className="h-6 w-6 text-neutral-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-neutral-900 dark:text-white leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                            {job.position}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{job.company}</p>
                    </div>
                </div>

                <div className="relative" ref={menuRef}>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-900/50 dark:hover:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                    </Button>

                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-1 w-40 rounded-md border bg-white shadow-lg dark:bg-neutral-800 dark:border-neutral-700 z-10 p-1">
                            <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">Actions</div>
                            <div className="h-px bg-neutral-100 dark:bg-neutral-700 my-1" />
                            <button
                                onClick={() => { setIsMenuOpen(false); onEdit(job); }}
                                className="w-full text-left px-2 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-sm text-neutral-700 dark:text-neutral-300"
                            >
                                Edit details
                            </button>
                            <div className="h-px bg-neutral-100 dark:bg-neutral-700 my-1" />
                            <button
                                onClick={() => { setIsMenuOpen(false); onDelete(job.id); }}
                                className="w-full text-left px-2 py-1.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 rounded-sm text-red-600 dark:text-red-400"
                            >
                                Delete job
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-neutral-400" />
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-neutral-400" />
                    <span>{job.appliedDate ? format(new Date(job.appliedDate), "MMM d, yyyy") : "N/A"}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800 mt-2">
                <Badge variant="outline" className={`capitalize font-medium ${getStatusColor(job.status)}`}>
                    {job.status.replace("-", " ")}
                </Badge>
                <div className="text-xs font-medium text-neutral-400">
                    {job.jobType} • {job.salary}
                </div>
            </div>
            {job.jobLink && (
                <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-600 dark:text-violet-400">
                    <ExternalLink className="w-4 h-4" />
                </a>
            )}
        </div>
    )
}
