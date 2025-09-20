import { RotateCcw, Save, Edit, Settings, MessageSquare, Target, FileText } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setAIPersonality } from '@/store/slices/knowledgeSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function Knowledge() {
  const { aiPersonality, responseTemplates, scoringWeights, evaluationGuidelines, customInstructions } = useSelector((state: RootState) => state.knowledge);
  const dispatch = useDispatch();

  const handlePersonalityChange = (field: string, value: number | string) => {
    dispatch(setAIPersonality({
      ...aiPersonality,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Knowledge Base</h1>
          <p className="text-muted-foreground">Customize your AI interviewer's behavior, responses, and evaluation criteria</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button className="bg-orange hover:bg-orange/90 text-orange-foreground shadow-soft">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="ai-personality" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ai-personality">AI Personality</TabsTrigger>
          <TabsTrigger value="response-templates">Response Templates</TabsTrigger>
          <TabsTrigger value="evaluation-criteria">Evaluation Criteria</TabsTrigger>
          <TabsTrigger value="custom-instructions">Custom Instructions</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-personality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Personality Settings */}
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-semibold">AI Personality Settings</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">Adjust how your AI interviewer communicates and behaves</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Communication Tone</label>
                  <Select value={aiPersonality.communicationTone} onValueChange={(value) => handlePersonalityChange('communicationTone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Friendly">Friendly</SelectItem>
                      <SelectItem value="Casual">Casual</SelectItem>
                      <SelectItem value="Formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Formality Level: {aiPersonality.formalityLevel}%</label>
                    <div className="flex text-xs text-muted-foreground gap-4">
                      <span>Casual</span>
                      <span>Very Formal</span>
                    </div>
                  </div>
                  <Slider
                    value={[aiPersonality.formalityLevel]}
                    onValueChange={(value) => handlePersonalityChange('formalityLevel', value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Empathy Level: {aiPersonality.empathyLevel}%</label>
                    <div className="flex text-xs text-muted-foreground gap-4">
                      <span>Direct</span>
                      <span>Very Empathetic</span>
                    </div>
                  </div>
                  <Slider
                    value={[aiPersonality.empathyLevel]}
                    onValueChange={(value) => handlePersonalityChange('empathyLevel', value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Directness: {aiPersonality.directness}%</label>
                    <div className="flex text-xs text-muted-foreground gap-4">
                      <span>Indirect</span>
                      <span>Very Direct</span>
                    </div>
                  </div>
                  <Slider
                    value={[aiPersonality.directness]}
                    onValueChange={(value) => handlePersonalityChange('directness', value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Enthusiasm: {aiPersonality.enthusiasm}%</label>
                    <div className="flex text-xs text-muted-foreground gap-4">
                      <span>Reserved</span>
                      <span>Very Enthusiastic</span>
                    </div>
                  </div>
                  <Slider
                    value={[aiPersonality.enthusiasm]}
                    onValueChange={(value) => handlePersonalityChange('enthusiasm', value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-semibold">Preview</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">See how your AI interviewer will sound with current settings</p>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <p className="text-sm italic text-muted-foreground mb-2">Sample interview opening:</p>
                  <p className="text-sm leading-relaxed">
                    "Hello Sarah! Welcome to your interview for the Senior Frontend Developer position. I'm your AI interviewer today, and I'm excited to learn more about your background and experience. This interview will take approximately 45 minutes, and we'll cover various aspects of your qualifications. Please feel free to ask questions at any time. Shall we begin?"
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    This preview updates based on your personality settings above.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="response-templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Response Templates */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Response Templates</CardTitle>
                <p className="text-sm text-muted-foreground">Manage pre-written responses for different interview phases</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {responseTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {template.type}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {template.content.length > 100 
                        ? `${template.content.substring(0, 100)}...` 
                        : template.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Last modified: {template.lastModified}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Default Greeting */}
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Default Greeting</CardTitle>
                    <p className="text-sm text-muted-foreground">Standard professional interview opening</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Template Content</label>
                    <Textarea 
                      className="mt-2"
                      rows={6}
                      value="Hello {candidate_name}! Welcome to your interview for the {position} role at {company}. I'm your AI interviewer today, and I'm excited to learn more about your background and experience. This interview will take approximately {duration} minutes, and we'll cover various aspects of your qualifications. Please feel free to ask questions at any time. Shall we begin?"
                      readOnly
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Available variables:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">{'{candidate_name}'}</Badge>
                      <Badge variant="outline" className="text-xs">{'{position}'}</Badge>
                      <Badge variant="outline" className="text-xs">{'{company}'}</Badge>
                      <Badge variant="outline" className="text-xs">{'{duration}'}</Badge>
                      <Badge variant="outline" className="text-xs">{'{interviewer_name}'}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Last modified: 2024-01-10</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="evaluation-criteria" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scoring Weights */}
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-semibold">Scoring Weights</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">Adjust the importance of different evaluation criteria</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Technical Skills: {scoringWeights.technicalSkills}%</label>
                  </div>
                  <Slider
                    value={[scoringWeights.technicalSkills]}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Communication: {scoringWeights.communication}%</label>
                  </div>
                  <Slider
                    value={[scoringWeights.communication]}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Problem Solving: {scoringWeights.problemSolving}%</label>
                  </div>
                  <Slider
                    value={[scoringWeights.problemSolving]}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Cultural Fit: {scoringWeights.culturalFit}%</label>
                  </div>
                  <Slider
                    value={[scoringWeights.culturalFit]}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="pt-2">
                  <p className="text-sm font-medium">Total: {Object.values(scoringWeights).reduce((a, b) => a + b, 0)}%</p>
                  <p className="text-xs text-muted-foreground">Weights should total 100% for optimal scoring accuracy</p>
                </div>
              </CardContent>
            </Card>

            {/* Evaluation Guidelines */}
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl font-semibold">Evaluation Guidelines</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">Define how the AI should evaluate candidate responses</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm">Technical Skills (40%)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {evaluationGuidelines.technicalSkills}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm">Communication (30%)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {evaluationGuidelines.communication}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm">Problem Solving (20%)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {evaluationGuidelines.problemSolving}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm">Cultural Fit (10%)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {evaluationGuidelines.culturalFit}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom-instructions" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl font-semibold">Custom Instructions</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Provide specific guidance for how the AI should conduct interviews</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Interview Instructions</label>
                <Textarea 
                  className="mt-2"
                  rows={8}
                  value={customInstructions}
                  placeholder="Enter custom instructions for the AI interviewer..."
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Example instructions:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Always ask for specific examples when candidates mention achievements</li>
                  <li>Focus on recent experience (last 2-3 years) for senior roles</li>
                  <li>Probe deeper on any gaps in employment history</li>
                  <li>Ask about team collaboration and conflict resolution</li>
                  <li>Ensure candidates have time to ask questions at the end</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}