import { User, CreditCard, Settings2, Bell, Globe, Palette } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { useState } from "react";
import { Dialog, DialogContent } from "../components/ui/dialog";

export default function Settings() {
  const { profile, plan, generalSettings } = useSelector((state: RootState) => state.settings);

  const [photo, setPhoto] = useState<string | null>(profile.avatar || null);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
  name: profile.name,
  email: profile.email,
  company: profile.company,
  role: profile.role,
  avatar: profile.avatar || null,
});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { id, value } = e.target;
  setFormData((prev) => ({ ...prev, [id]: value }));
};


  const usagePercentage = (plan.usedThisMonth / plan.interviewsPerMonth) * 100;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account, plan, and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="plan">Plan & Billing</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        {/* this is the profile tab content */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl font-semibold">Profile Information</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Update your personal information and profile settings</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div onClick={() => formData.avatar && setOpen(true)} className="cursor-pointer transition hover:ring-4 hover:ring-orange-500/60 rounded-full">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={formData.avatar || profile.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-medium">
                      {profile.name.split(" ").map((n: string)=> n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* change photo dialog */}
                <div className="space-y-2">
                  <input
                    id="photoInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button variant="outline" size="sm" onClick={() => document.getElementById("photoInput")?.click()}>
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>

                {/* Large photo preview*/}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="max-w-lg p-0 bg-transparent border-none shadow-none">
                    {photo && (
                      <img
                        src={photo}
                        alt="Profile large"
                        className="rounded-lg shadow-xl w-full h-auto"
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </div>
                  
              {/* profile information form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  />
                </div>
              </div>


              <div className="flex justify-end">
                <Button className="bg-primary hover:bg-primary/90">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* this is the plan tab content */}

        <TabsContent value="plan" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl font-semibold">Current Plan</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Manage your subscription and billing information</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-6 border rounded-lg bg-gradient-subtle">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <Badge className="bg-primary text-white">{plan.type.toUpperCase()}</Badge>
                  </div>
                  <p className="text-2xl font-bold">
                    ${plan.price}<span className="text-sm font-normal text-muted-foreground">/{plan.billingCycle}</span>
                  </p>
                </div>
                <Button variant="outline">
                  Change Plan
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Interview Usage This Month</span>
                  <span className="text-sm text-muted-foreground">
                    {plan.usedThisMonth} / {plan.interviewsPerMonth}
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {plan.interviewsPerMonth - plan.usedThisMonth} interviews remaining
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-3">Plan Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-stats-green rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Next billing date</p>
                    <p className="text-sm text-muted-foreground">February 15, 2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Billing History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* this is the general tab content */}

        <TabsContent value="general" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl font-semibold">General Settings</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Configure your application preferences</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Notifications</h4>
                </div>
                <div className="space-y-3 pl-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch checked={generalSettings.notifications.email} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Push Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive push notifications in your browser</p>
                    </div>
                    <Switch checked={generalSettings.notifications.push} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Interview Notifications</p>
                      <p className="text-xs text-muted-foreground">Get notified about interview status changes</p>
                    </div>
                    <Switch checked={generalSettings.notifications.interview} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Candidate Updates</p>
                      <p className="text-xs text-muted-foreground">Notifications when candidates complete interviews</p>
                    </div>
                    <Switch checked={generalSettings.notifications.candidateUpdates} />
                  </div>
                </div>
              </div>

              {/* Localization */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Localization</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={generalSettings.timezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (EST)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CST)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MST)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PST)</SelectItem>
                        <SelectItem value="Europe/London">GMT</SelectItem>
                        <SelectItem value="Europe/Paris">CET</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={generalSettings.language}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Appearance */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Appearance</h4>
                </div>
                <div className="pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={generalSettings.theme}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-primary hover:bg-primary/90">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}