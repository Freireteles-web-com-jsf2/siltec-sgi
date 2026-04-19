import React from 'react'
import { Calendar as CalendarIcon, MapPin, Tag } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface EventCardProps {
  title: string
  description?: string
  date: string
  location: string
  category: 'retreat' | 'fair' | 'social' | 'worship'
  imageUrl?: string
  isFeatured?: boolean
}

const categoryColors = {
  retreat: "bg-amber-500/20 text-amber-500 border-amber-500/30",
  fair: "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
  social: "bg-success-500/20 text-success border-success/30",
  worship: "bg-primary/20 text-primary border-primary/30",
}

const categoryLabels = {
  retreat: "Retiro",
  fair: "Feira",
  social: "Social",
  worship: "Culto",
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  location,
  category,
  imageUrl,
  isFeatured
}) => {
  return (
    <Card className={cn(
      "bg-santuario-glass border-white/10 overflow-hidden group hover:border-primary/50 transition-all duration-300",
      isFeatured && "ring-2 ring-primary/30"
    )}>
      <div className="aspect-video w-full bg-zinc-800 relative overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-700">
            <CalendarIcon size={48} />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge className={cn("backdrop-blur-md border", categoryColors[category])}>
            {categoryLabels[category]}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <h3 className="font-bold text-lg text-text font-manrope group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-3">
        {description && (
          <p className="text-sm text-text-muted line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <CalendarIcon size={14} className="text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <MapPin size={14} className="text-primary" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
