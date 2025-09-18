import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthPage } from "@/components/auth/AuthPage";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { JournalForm } from "@/components/journal/JournalForm";

const Index = () => {
  const { user, loading } = useAuth();
  const [showJournal, setShowJournal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (showJournal) {
    return (
      <div className="min-h-screen bg-background">
        <JournalForm onBackToDashboard={() => setShowJournal(false)} />
      </div>
    );
  }

  return (
    <Dashboard 
      user={user} 
      onStartJournal={() => setShowJournal(true)}
    />
  );
};

export default Index;
