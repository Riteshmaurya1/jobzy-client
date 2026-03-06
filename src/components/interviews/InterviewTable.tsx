import { format } from "date-fns"
import { Calendar, Clock, Video, MapPin, User, MoreVertical, Edit, Trash2, Link as LinkIcon, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Interview } from "@/services/interviewsService"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface InterviewTableProps {
    interviews: Interview[];
    onEdit: (interview: Interview) => void;
    onDelete: (id: string) => void;
}

export function InterviewTable({ interviews, onEdit, onDelete }: InterviewTableProps) {
    if (interviews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50">
                <p className="text-neutral-500">No interviews found.</p>
            </div>
        )
    }

    return (
        <div className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                        <TableHead className="w-[140px] md:w-[200px]">Role & Company</TableHead>
                        <TableHead className="hidden md:table-cell">Round</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead className="hidden md:table-cell">Mode</TableHead>
                        <TableHead className="hidden md:table-cell">Interviewer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {interviews.map((interview) => (
                        <TableRow key={interview.id}>
                            <TableCell className="font-medium">
                                <div className="flex flex-col">
                                    <span className="text-neutral-900 dark:text-white font-medium line-clamp-1">
                                        {interview.job?.position || "Unknown Role"}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                        <Building2 className="h-3 w-3" />
                                        <span>{interview.job?.company || "Unknown Company"}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                    {interview.round}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span>{format(new Date(interview.interviewDate), "MMM d, yyyy")}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>{interview.interviewTime}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                    {interview.interviewMode === 'in-person' ?
                                        <MapPin className="h-4 w-4 text-violet-500" /> :
                                        <Video className="h-4 w-4 text-violet-500" />
                                    }
                                    <span className="capitalize">{interview.interviewMode.replace("-", " ")}</span>
                                </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {interview.interviewerName ? (
                                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <User className="h-4 w-4" />
                                        <span>{interview.interviewerName}</span>
                                    </div>
                                ) : (
                                    <span className="text-xs text-neutral-400 italic">Not assigned</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border
                                    ${interview.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900' :
                                        interview.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900' :
                                            'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900'}`}>
                                    {interview.status || 'Scheduled'}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {interview.meetingLink && (
                                            <DropdownMenuItem asChild className="focus:bg-violet-50 focus:text-violet-700 dark:focus:bg-violet-900/20 dark:focus:text-violet-300">
                                                <a href={interview.meetingLink} target="_blank" rel="noreferrer" className="flex items-center cursor-pointer w-full">
                                                    <LinkIcon className="mr-2 h-4 w-4" />
                                                    Join Meeting
                                                </a>
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem onClick={() => onEdit(interview)} className="focus:bg-violet-50 focus:text-violet-700 dark:focus:bg-violet-900/20 dark:focus:text-violet-300">
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20" onClick={() => onDelete(interview.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
