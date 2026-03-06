"use client"

import { Calendar, Clock, MapPin, Video, Building2 } from "lucide-react"
import { format } from "date-fns"

interface Interview {
    id: string;
    round: string;
    interviewDate: string;
    interviewTime: string;
    interviewMode: "video-call" | "phone-call" | "in-person";
    meetingLink?: string;
    status: string;
    interviewerName?: string;
    job: {
        company: string;
        position: string;
    };
}

interface UpcomingInterviewsProps {
    interviews: Interview[];
}

export function UpcomingInterviews({ interviews }: UpcomingInterviewsProps) {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Upcoming interviews</h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-6">Stay ready for your next conversations.</p>

            {interviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-4 text-center">
                    <p className="text-sm text-neutral-500">No upcoming interviews scheduled.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {interviews.slice(0, 1).map((interview) => (
                        <div key={interview.id} className="flex flex-col gap-3 p-4 rounded-xl bg-white border border-neutral-100 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900 dark:border-neutral-800">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-lg text-neutral-900 dark:text-white leading-tight">{interview.job.position}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{interview.job.company}</p>
                                    </div>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide border uppercase shadow-sm ${interview.status === 'scheduled'
                                    ? 'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20'
                                    : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                                    }`}>
                                    {interview.round}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-1.5 rounded-md bg-white dark:bg-neutral-800 text-neutral-500 shadow-sm">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">Date</span>
                                        <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{format(new Date(interview.interviewDate), "MMM d, yyyy")}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="p-1.5 rounded-md bg-white dark:bg-neutral-800 text-neutral-500 shadow-sm">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">Time</span>
                                        <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{interview.interviewTime}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 col-span-2 pt-2 border-t border-neutral-200 dark:border-neutral-700/50">
                                    <div className="p-1.5 rounded-md bg-white dark:bg-neutral-800 text-neutral-500 shadow-sm">
                                        {interview.interviewMode === "in-person" ? <MapPin className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">Mode</span>
                                        <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 capitalize">{interview.interviewMode.replace("-", " ")}</span>
                                    </div>
                                </div>
                            </div>

                            {
                                interview.meetingLink && (
                                    <a
                                        href={interview.meetingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-violet-200 dark:shadow-none transition-all duration-300 group"
                                    >
                                        <Video className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                        <span>Join Meeting</span>
                                    </a>
                                )
                            }
                        </div>
                    ))}
                </div>
            )
            }
        </div>
    )
}

