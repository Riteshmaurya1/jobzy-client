import { format } from "date-fns"
import { Calendar, Clock, Video, MapPin, User, MoreVertical, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Interview } from "@/services/interviewsService"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface InterviewCardProps {
    interview: Interview;
    onEdit: (interview: Interview) => void;
    onDelete: (id: string) => void;
}

export function InterviewCard({ interview, onEdit, onDelete }: InterviewCardProps) {
    const formattedDate = format(new Date(interview.interviewDate), "MMM d, yyyy")

    return (
        <div className="group relative flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-lg text-neutral-900 dark:text-white line-clamp-1">
                        {interview.round}
                    </h3>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        {interview.job ? `${interview.job.position} at ${interview.job.company}` : "Job details unavailable"}
                    </p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(interview)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => onDelete(interview.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <Calendar className="h-4 w-4 text-violet-500" />
                    <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <Clock className="h-4 w-4 text-violet-500" />
                    <span>{interview.interviewTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    {interview.interviewMode === 'in-person' ? <MapPin className="h-4 w-4 text-violet-500" /> : <Video className="h-4 w-4 text-violet-500" />}
                    <span className="capitalize">{interview.interviewMode.replace("-", " ")}</span>
                </div>
                {interview.interviewerName && (
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <User className="h-4 w-4 text-violet-500" />
                        <span>{interview.interviewerName}</span>
                    </div>
                )}
            </div>

            <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                    ${interview.status === 'completed' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                        interview.status === 'cancelled' ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                            'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                    {interview.status || 'Scheduled'}
                </span>

                {interview.meetingLink && (
                    <a href={interview.meetingLink} target="_blank" rel="noreferrer" className="text-xs font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 hover:underline">
                        Join Meeting
                    </a>
                )}
            </div>
        </div>
    )
}
