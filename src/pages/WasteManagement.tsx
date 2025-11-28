import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Camera, 
  Mic, 
  Send,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const WasteManagement = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [issueText, setIssueText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmitIssue = () => {
    if (!issueText.trim()) {
      toast.error('Please describe the issue');
      return;
    }
    toast.success('Issue reported successfully! Crew dispatched.');
    setIssueText('');
  };

  const recentReports = [
    { id: 1, type: 'Bin Overflow', location: 'Sector 21, Block A', status: 'resolved', time: '2 hours ago' },
    { id: 2, type: 'Waste Dump', location: 'Main Road, Near Park', status: 'in-progress', time: '5 hours ago' },
    { id: 3, type: 'Missing Bin', location: 'Community Center', status: 'pending', time: '1 day ago' }
  ];

  const stats = [
    { label: 'Issues Reported', value: '8', icon: <AlertCircle className="h-5 w-5" /> },
    { label: 'Resolved', value: '6', icon: <CheckCircle className="h-5 w-5" /> },
    { label: 'Avg Response Time', value: '45m', icon: <Clock className="h-5 w-5" /> },
    { label: 'CO₂ Saved', value: '50kg', icon: <TrendingUp className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Waste & Resource Management
          </h1>
          <p className="text-muted-foreground">
            Report issues, track waste collection, and contribute to a cleaner community
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 gradient-card border-border/50 shadow-soft">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {stat.icon}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Report Issue Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 gradient-card border-border/50 shadow-eco">
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trash2 className="h-6 w-6 text-primary" />
              Report an Issue
            </h2>
            
            <div className="space-y-4">
              <Textarea
                placeholder="Describe the waste management issue (e.g., bin overflow, illegal dumping)..."
                className="min-h-[120px] resize-none"
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
              />
              
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2">
                  <Camera className="h-4 w-4" />
                  Add Photo
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Mic className={`h-4 w-4 ${isRecording ? 'text-destructive animate-pulse' : ''}`} />
                  {isRecording ? 'Recording...' : 'Voice Note'}
                </Button>
                <Button variant="outline" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Add Location
                </Button>
                <Button 
                  className="gradient-eco shadow-eco gap-2 ml-auto"
                  onClick={handleSubmitIssue}
                >
                  <Send className="h-4 w-4" />
                  Submit Report
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-6 gradient-card border-border/50 shadow-soft overflow-hidden">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Live Resource Map</h2>
            <div className="bg-muted/30 rounded-lg h-[400px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
              <div className="relative z-10 text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4 animate-bounce" />
                <p className="text-muted-foreground">Interactive map showing:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Public waste bins</li>
                  <li>• Reported issues & hotspots</li>
                  <li>• Real-time crew locations</li>
                  <li>• Optimized collection routes</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">Your Recent Reports</h2>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <Card key={report.id} className="p-4 gradient-card border-border/50 hover:shadow-soft transition-all">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Trash2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{report.type}</h4>
                      <p className="text-sm text-muted-foreground">{report.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">{report.time}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      report.status === 'resolved' ? 'default' : 
                      report.status === 'in-progress' ? 'secondary' : 
                      'outline'
                    }
                    className={
                      report.status === 'resolved' ? 'bg-success text-success-foreground' :
                      report.status === 'in-progress' ? 'bg-warning text-warning-foreground' :
                      ''
                    }
                  >
                    {report.status === 'resolved' ? <CheckCircle className="h-3 w-3 mr-1" /> :
                     report.status === 'in-progress' ? <Clock className="h-3 w-3 mr-1" /> :
                     <AlertCircle className="h-3 w-3 mr-1" />}
                    {report.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Impact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="p-6 gradient-card border-primary/20 shadow-eco">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-success/10 text-success">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Quantum-Optimized Routing</h3>
                <p className="text-muted-foreground mb-3">
                  AI automatically optimizes waste collection routes, reducing response time by 40% and saving 50kg CO₂ per trip.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-2xl font-bold text-success">40%</span>
                    <p className="text-muted-foreground">Faster Response</p>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-success">50kg</span>
                    <p className="text-muted-foreground">CO₂ Saved/Trip</p>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-success">0</span>
                    <p className="text-muted-foreground">Manual Dispatch</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default WasteManagement;
