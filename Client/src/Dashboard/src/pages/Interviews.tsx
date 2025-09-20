import { Plus, Search, Filter, Calendar, Users, CheckCircle, Clock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function Interviews() {
  const { interviews, stats } = useSelector((state: RootState) => state.interviews);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-stats-blue text-white';
      case 'scheduled':
        return 'bg-stats-yellow text-white';
      case 'completed':
        return 'bg-stats-green text-white';
      case 'draft':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '▶️';
      case 'scheduled':
        return '📅';
      case 'completed':
        return '✅';
      case 'draft':
        return '📝';
      default:
        return '📋';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interviews</h1>
          <p className="text-muted-foreground">Manage your AI-powered interview sessions</p>
        </div>
        <Button className="bg-orange hover:bg-orange/90 text-orange-foreground shadow-soft">
          <Plus className="mr-2 h-4 w-4" />
          New Interview
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Interviews"
          value={stats.total}
          icon={<Calendar className="h-6 w-6 text-white" />}
          iconBg="bg-stats-orange"
        />
        <StatsCard
          title="Active"
          value={stats.active}
          icon={<Clock className="h-6 w-6 text-white" />}
          iconBg="bg-stats-blue"
        />
        <StatsCard
          title="Total Candidates"
          value={stats.totalCandidates}
          icon={<Users className="h-6 w-6 text-white" />}
          iconBg="bg-primary"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle className="h-6 w-6 text-white" />}
          iconBg="bg-stats-green"
        />
      </div>

      {/* Interview Sessions */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Interview Sessions</CardTitle>
              <p className="text-sm text-muted-foreground">Manage and monitor your interview sessions</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search interviews..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Interview</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Candidates</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Progress</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Duration</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Created</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {interviews.map((interview) => (
                  <tr key={interview.id} className="hover:bg-muted/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{getStatusIcon(interview.status)}</span>
                        <div>
                          <p className="font-medium text-foreground">{interview.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge className={getStatusColor(interview.status)}>
                        {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{interview.candidates}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-muted-foreground">{interview.progress}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{interview.duration}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-muted-foreground">{interview.created}</span>
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