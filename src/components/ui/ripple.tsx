"use client"

import React, { useState, useCallback, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

interface BackgroundRippleEffectProps {
    rows?: number
    cols?: number
    cellSize?: number
    className?: string
}

export function BackgroundRippleEffect({
    rows = 8,
    cols = 16,
    cellSize = 80,
    className,
}: BackgroundRippleEffectProps) {
    const { theme } = useTheme()
    const [clickedCell, setClickedCell] = useState<{ row: number; col: number } | null>(null)

    const handleCellClick = useCallback((row: number, col: number) => {
        setClickedCell({ row, col })
    }, [])

    useEffect(() => {
        if (clickedCell) {
            const timer = setTimeout(() => setClickedCell(null), 1500)
            return () => clearTimeout(timer)
        }
    }, [clickedCell])

    // Theme-aware colors
    const borderColor = theme === 'dark'
        ? 'rgba(139, 92, 246, 0.2)'
        : 'rgba(139, 92, 246, 0.15)'

    const fillColor = theme === 'dark'
        ? 'rgba(139, 92, 246, 0.05)'
        : 'rgba(139, 92, 246, 0.03)'

    const rippleColor = theme === 'dark'
        ? 'rgba(139, 92, 246, 0.4)'
        : 'rgba(139, 92, 246, 0.3)'

    // Memoize cells
    const cells = useMemo(() => {
        return Array.from({ length: rows * cols }, (_, index) => {
            const row = Math.floor(index / cols)
            const col = index % cols
            return { row, col, key: `${row}-${col}` }
        })
    }, [rows, cols])

    const getAnimationDelay = (row: number, col: number) => {
        if (!clickedCell) return 0
        const distance = Math.sqrt(
            Math.pow(row - clickedCell.row, 2) + Math.pow(col - clickedCell.col, 2)
        )
        return distance * 40
    }

    return (
        <div
            className={cn(
                "absolute inset-0 overflow-hidden pointer-events-auto",
                className
            )}
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
                gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
                justifyContent: 'center',
                alignContent: 'center',
            }}
        >
            {cells.map(({ row, col, key }) => {
                const delay = getAnimationDelay(row, col)
                const isActive = clickedCell !== null

                return (
                    <div
                        key={key}
                        onClick={() => handleCellClick(row, col)}
                        className="cursor-pointer transition-all duration-300"
                        style={{
                            width: cellSize,
                            height: cellSize,
                            backgroundColor: isActive ? rippleColor : fillColor,
                            border: `1px solid ${borderColor}`,
                            transitionDelay: isActive ? `${delay}ms` : '0ms',
                        }}
                    />
                )
            })}
        </div>
    )
}
