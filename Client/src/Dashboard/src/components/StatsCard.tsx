import { ReactNode } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  iconBg?: string;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeLabel,
  icon, 
  iconBg = 'bg-primary',
  className 
}: StatsCardProps) {
  return (
    <Card className={cn('shadow-soft hover:shadow-purple transition-shadow duration-200', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change !== undefined && (
              <p className="text-sm flex items-center gap-1">
                <span className={cn(
                  'font-medium',
                  change > 0 ? 'text-stats-green' : change < 0 ? 'text-destructive' : 'text-muted-foreground'
                )}>
                  {change > 0 ? '+' : ''}{change}
                  {changeLabel && ` ${changeLabel}`}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </p>
            )}
          </div>
          <div className={cn('p-3 rounded-xl', iconBg)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}