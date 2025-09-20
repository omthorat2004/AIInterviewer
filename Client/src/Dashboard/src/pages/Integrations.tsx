import { Zap, CheckCircle, Settings, Trash2, Video, Shield } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Integrations() {
  const { integrations, stats } = useSelector((state: RootState) => state.integrations);

  const connectedIntegrations = integrations.filter(i => i.status === 'connected');
  const availableIntegrations = integrations.filter(i => i.status === 'available');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools to streamline your interview process</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">4 Connected</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Integrations"
          value={stats.total}
          icon={<Zap className="h-6 w-6 text-white" />}
          iconBg="bg-stats-orange"
        />
        <StatsCard
          title="Connected"
          value={stats.connected}
          icon={<CheckCircle className="h-6 w-6 text-white" />}
          iconBg="bg-stats-green"
        />
        <StatsCard
          title="Video Platforms"
          value={stats.videoPlatforms}
          icon={<Video className="h-6 w-6 text-white" />}
          iconBg="bg-stats-blue"
        />
        <StatsCard
          title="Security Score"
          value={`${stats.securityScore}%`}
          icon={<Shield className="h-6 w-6 text-white" />}
          iconBg="bg-primary"
        />
      </div>

      <Tabs defaultValue="connected" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="connected">Connected ({connectedIntegrations.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableIntegrations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="connected" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedIntegrations.map((integration) => (
              <Card key={integration.id} className="shadow-soft hover:shadow-purple transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-purple rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {integration.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold">{integration.name}</CardTitle>
                        {integration.popular && (
                          <Badge variant="secondary" className="text-xs mt-1">Popular</Badge>
                        )}
                      </div>
                    </div>
                    <Badge className="bg-stats-green text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {integration.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">+1 more</Badge>
                    </div>
                  </div>

                  {integration.lastSynced && (
                    <p className="text-xs text-muted-foreground">
                      Last synced: {integration.lastSynced}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Disconnect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableIntegrations.map((integration) => (
              <Card key={integration.id} className="shadow-soft hover:shadow-purple transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground font-bold text-sm">
                          {integration.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold">{integration.name}</CardTitle>
                        {integration.popular && (
                          <Badge variant="secondary" className="text-xs mt-1">Popular</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {integration.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}