import { Plus, Search, Filter, Users, UserCheck, UserX, Clock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Candidates() {
  const { candidates, stats } = useSelector((state: RootState) => state.candidates);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hired':
        return 'bg-stats-green text-white';
      case 'interviewed':
        return 'bg-primary text-white';
      case 'screening':
        return 'bg-stats-yellow text-white';
      case 'rejected':
        return 'bg-destructive text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
          <p className="text-muted-foreground">Manage your candidate pipeline and track applications</p>
        </div>
        <Button className="bg-orange hover:bg-orange/90 text-orange-foreground shadow-soft">
          <Plus className="mr-2 h-4 w-4" />
          Add Candidate
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Total"
          value={stats.total}
          icon={<Users className="h-6 w-6 text-white" />}
          iconBg="bg-stats-orange"
        />
        <StatsCard
          title="New"
          value={stats.new}
          icon={<Clock className="h-6 w-6 text-white" />}
          iconBg="bg-stats-blue"
        />
        <StatsCard
          title="Screening"
          value={stats.screening}
          icon={<Clock className="h-6 w-6 text-white" />}
          iconBg="bg-stats-yellow"
        />
        <StatsCard
          title="Interviewed"
          value={stats.interviewed}
          icon={<UserCheck className="h-6 w-6 text-white" />}
          iconBg="bg-primary"
        />
        <StatsCard
          title="Hired"
          value={stats.hired}
          icon={<UserCheck className="h-6 w-6 text-white" />}
          iconBg="bg-stats-green"
        />
      </div>

      {/* All Candidates */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">All Candidates</CardTitle>
              <p className="text-sm text-muted-foreground">Track and manage candidate applications</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search candidates..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Status
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Candidate</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Position</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Source</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Applied</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Score</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Tags</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-muted/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{candidate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-medium">{candidate.position}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-muted-foreground">{candidate.source}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-muted-foreground">{candidate.applied}</span>
                    </td>
                    <td className="py-4">
                      <Badge className={getStatusColor(candidate.status)}>
                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-medium">
                        {candidate.score > 0 ? `${candidate.score}%` : '-'}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-1">
                        {candidate.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {candidate.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{candidate.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4">
                      <Button variant="ghost" size="sm">
                        •••
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}