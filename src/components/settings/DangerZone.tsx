"use client"

import { Trash2, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DangerZoneProps {
    onDelete: () => Promise<void>;
}

export function DangerZone({ onDelete }: DangerZoneProps) {
    return (
        <Card className="border-red-100 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/30 shadow-none">
            <CardContent className="p-6">
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-900/30 dark:text-red-500 mt-1">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-red-900 dark:text-red-400">Danger zone</h3>
                            <p className="text-sm text-red-600 dark:text-red-300/70 mt-1">Deleting your account is permanent and cannot be undone.</p>
                        </div>
                    </div>

                    <Button
                        variant="destructive"
                        onClick={onDelete}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-500"
                    >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete account
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
