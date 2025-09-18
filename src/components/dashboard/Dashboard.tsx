import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, TrendingUp, LogOut, PenTool } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { JournalTemplateCard } from "./JournalTemplateCard";

interface DashboardProps {
  user: any;
  onStartJournal: () => void;
}

export function Dashboard({ user, onStartJournal }: DashboardProps) {
  const [entriesCount, setEntriesCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [todayEntry, setTodayEntry] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Get total entries count
    const { count } = await supabase
      .from('journal_entries')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);
    
    setEntriesCount(count || 0);

    // Check if today's entry exists
    const today = new Date().toISOString().split('T')[0];
    const { data: entry } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();
    
    setTodayEntry(entry);

    // Calculate streak (simplified version)
    const { data: recentEntries } = await supabase
      .from('journal_entries')
      .select('date')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(30);

    if (recentEntries && recentEntries.length > 0) {
      let streak = 0;
      const dates = recentEntries.map(entry => entry.date);
      const today = new Date();
      
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        
        if (dates.includes(dateStr)) {
          streak++;
        } else {
          break;
        }
      }
      setStreakCount(streak);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Daily Journal</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Welcome back! 
            </h2>
            <p className="text-lg text-muted-foreground">
              {formatDate()}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{entriesCount}</div>
                <p className="text-xs text-muted-foreground">
                  Journal entries written
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{streakCount}</div>
                <p className="text-xs text-muted-foreground">
                  Days in a row
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Status</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {todayEntry ? "✓" : "○"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {todayEntry ? "Entry completed" : "Not started yet"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Journal Template Card */}
          <div className="flex justify-center">
            <JournalTemplateCard onStartJournal={onStartJournal} />
          </div>

          {/* Quick Actions */}
          <div className="text-center">
            <Button 
              onClick={onStartJournal}
              size="lg"
              className="flex items-center gap-2 px-8 py-3 text-lg"
            >
              <PenTool className="w-5 h-5" />
              {todayEntry ? "Continue Today's Entry" : "Start Today's Journal"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}