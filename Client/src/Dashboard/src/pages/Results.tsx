import { Download, Search, Filter, Users, FileText, ThumbsUp, BarChart3 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { StatsCard } from '../components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useState } from "react";
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem} from "../components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteCandidate } from "../store/slices/resultsSlice";
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'; 


export default function Results() {
  const dispatch = useAppDispatch();
  const { candidateResults, stats, analytics } = useSelector((state: RootState) => state.results);
  
  //  Local state for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [decisionFilter, setDecisionFilter] = useState<string | null>(null);

  // Filtered results
  const filteredResults = candidateResults.filter((result) => {
    // Search by candidate name or email
    const matchesSearch =
      result.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by status (if selected)
    const matchesStatus = statusFilter ? result.status === statusFilter : true;
    // Filter by decision (if selected)
    const matchesDecision = decisionFilter ? result.decision === decisionFilter : true;

    return matchesSearch && matchesStatus && matchesDecision;
  });

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'hire':
        return 'bg-stats-green text-white';
      case 'maybe':
        return 'bg-stats-yellow text-white';
      case 'no-hire':
        return 'bg-destructive text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDecisionText = (decision: string) => {
    switch (decision) {
      case 'hire':
        return 'Hire';
      case 'maybe':
        return 'Maybe';
      case 'no-hire':
        return 'No Hire';
      default:
        return 'Pending';
    }
  };

  const exportToExcel = () => {
  // Convert candidateResults to worksheet
  const worksheet = XLSX.utils.json_to_sheet(
    candidateResults.map(result => ({
      Candidate: result.candidateName,
      Email: result.email,
      Position: result.position,
      "Interview Date": result.interviewDate,
      Duration: result.duration,
      Score: `${result.score}%`,
      Status: "Completed", // Or dynamic if you track
      Decision: getDecisionText(result.decision),
    }))
  );

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

  // Convert to binary and trigger download
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "candidate_results.xlsx");
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Results & Analytics</h1>
          <p className="text-muted-foreground">Track candidate performance and interview outcomes</p>
        </div>
        <Button className="bg-orange hover:bg-orange/90 text-orange-foreground shadow-soft" onClick={exportToExcel} >
          <Download className="mr-2 h-4 w-4" />
          Export Results
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Candidates"
          value={stats.totalCandidates}
          icon={<Users className="h-6 w-6 text-white" />}
          iconBg="bg-stats-orange"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={<FileText className="h-6 w-6 text-white" />}
          iconBg="bg-stats-blue"
        />
        <StatsCard
          title="Hired"
          value={stats.hired}
          icon={<ThumbsUp className="h-6 w-6 text-white" />}
          iconBg="bg-stats-green"
        />
        <StatsCard
          title="Avg Score"
          value={`${stats.avgScore}%`}
          icon={<BarChart3 className="h-6 w-6 text-white" />}
          iconBg="bg-primary"
        />
      </div>

      <Tabs defaultValue="candidate-results" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="candidate-results">Candidate Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="candidate-results" className="space-y-6">
          {/* Candidate Results */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">Candidate Results</CardTitle>
                  <p className="text-sm text-muted-foreground">View and manage interview results for all candidates</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search candidates..."
                      className="pl-10 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />

                  </div>

                    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm">
        <Filter className="mr-2 h-4 w-4" />
        {statusFilter ? statusFilter : "Status"}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>Completed</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>Pending</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>


                    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm">
        <Filter className="mr-2 h-4 w-4" />
        {decisionFilter ? decisionFilter : "Decision"}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => setDecisionFilter(null)}>All</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setDecisionFilter("hire")}>Hire</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setDecisionFilter("maybe")}>Maybe</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setDecisionFilter("no-hire")}>No Hire</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>


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
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Interview Date</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Duration</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Score</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Decision</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredResults.map((result) => (
                      <tr key={result.id} className="hover:bg-muted/50 transition-colors">
                        <td className="py-4">
                          <div>
                            <p className="font-medium text-foreground">{result.candidateName}</p>
                            <p className="text-sm text-muted-foreground">{result.email}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm font-medium">{result.position}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-muted-foreground">{result.interviewDate}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-muted-foreground">{result.duration}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm font-medium">{result.score}%</span>
                        </td>
                        <td className="py-4">
                          <Badge className="bg-stats-green text-white">
                            Completed
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Badge className={getDecisionColor(result.decision)}>
                            {getDecisionText(result.decision)}
                          </Badge>
                        </td>
                        <td className="py-4">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="sm">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        className="text-destructive"
        onClick={() => dispatch(deleteCandidate(result.id))}
      >
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Score Distribution */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Score Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">Average scores across different evaluation criteria</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Technical</span>
                    <span className="text-sm font-bold">{analytics.scoreDistribution.technical}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-stats-yellow h-2 rounded-full" 
                      style={{ width: `${analytics.scoreDistribution.technical}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Communication</span>
                    <span className="text-sm font-bold">{analytics.scoreDistribution.communication}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-stats-green h-2 rounded-full" 
                      style={{ width: `${analytics.scoreDistribution.communication}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Problem Solving</span>
                    <span className="text-sm font-bold">{analytics.scoreDistribution.problemSolving}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-stats-yellow h-2 rounded-full" 
                      style={{ width: `${analytics.scoreDistribution.problemSolving}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Cultural</span>
                    <span className="text-sm font-bold">{analytics.scoreDistribution.cultural}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-stats-green h-2 rounded-full" 
                      style={{ width: `${analytics.scoreDistribution.cultural}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hiring Funnel */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Hiring Funnel</CardTitle>
                <p className="text-sm text-muted-foreground">Conversion rates through the interview process</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Candidates</span>
                    <span className="text-sm font-bold">{analytics.hiringFunnel.totalCandidates}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-stats-blue h-3 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Completed Interviews</span>
                    <span className="text-sm font-bold">{analytics.hiringFunnel.completedInterviews}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-stats-green h-3 rounded-full" 
                      style={{ width: `${(analytics.hiringFunnel.completedInterviews / analytics.hiringFunnel.totalCandidates) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Recommended for Hire</span>
                    <span className="text-sm font-bold">{analytics.hiringFunnel.recommendedForHire}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-stats-orange h-3 rounded-full" 
                      style={{ width: `${(analytics.hiringFunnel.recommendedForHire / analytics.hiringFunnel.totalCandidates) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}