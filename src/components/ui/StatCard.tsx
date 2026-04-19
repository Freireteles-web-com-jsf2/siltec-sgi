import React from 'react'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  variation?: number
  variationLabel?: string
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  variation,
  variationLabel = 'vs mês anterior',
  className
}) => {
  const isPositive = variation && variation > 0

  return (
    <Card className={cn("bg-santuario-glass border-white/10 overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Icon size={24} />
          </div>
          {variation !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
              isPositive ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
            )}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {Math.abs(variation)}%
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-text-muted mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-text">{value}</h3>
          {variation !== undefined && (
            <p className="text-[10px] text-text-muted mt-2">{variationLabel}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
