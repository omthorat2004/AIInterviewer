import { Plus, Users, Calendar, TrendingUp, Clock, Eye, BarChart3, UserPlus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const { stats, recentInterviews } = useSelector((state: RootState) => state.dashboard);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-stats-green text-white';
      case 'in-progress':
        return 'bg-stats-yellow text-white';
      case 'scheduled':
        return 'bg-stats-blue text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your interviews.</p>
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
          value={stats.totalInterviews}
          change={stats.totalInterviewsChange}
          changeLabel="%"
          icon={<Users className="h-6 w-6 text-white" />}
          iconBg="bg-stats-orange"
        />
        <StatsCard
          title="This Month"
          value={stats.thisMonth}
          change={stats.thisMonthChange}
          changeLabel="%"
          icon={<Calendar className="h-6 w-6 text-white" />}
          iconBg="bg-stats-blue"
        />
        <StatsCard
          title="Success Rate"
          value={`${stats.successRate}%`}
          change={stats.successRateChange}
          changeLabel="%"
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          iconBg="bg-stats-green"
        />
        <StatsCard
          title="Avg. Duration"
          value={`${stats.avgDuration}m`}
          change={stats.avgDurationChange}
          changeLabel="m"
          icon={<Clock className="h-6 w-6 text-white" />}
          iconBg="bg-stats-yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Interviews */}
        <div className="lg:col-span-2">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Recent Interviews</CardTitle>
                <p className="text-sm text-muted-foreground">Latest interview sessions and their status</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                View All
                <Eye className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-medium text-primary">
                        {interview.candidateName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{interview.candidateName}</p>
                      <p className="text-sm text-muted-foreground">{interview.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{interview.date}</p>
                      <p className="text-sm text-muted-foreground">Score: {interview.score}%</p>
                    </div>
                    <Badge className={getStatusColor(interview.status)}>
                      {interview.status === 'in-progress' ? 'In Progress' : 
                       interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
              <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create New Interview
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Manage Candidates
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">This Month's Performance</CardTitle>
              <p className="text-sm text-muted-foreground">Interview completion and success rates</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-stats-green h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-stats-blue h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}