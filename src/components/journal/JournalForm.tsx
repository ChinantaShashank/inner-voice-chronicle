import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { JournalSection } from "./JournalSection";
import { StarRating } from "./StarRating";
import { Save, Calendar, RotateCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface JournalEntry {
  affirmation: string;
  priorityWork: string;
  priorityFamily: string;
  prioritySelfCare: string;
  gratitude: string;
  highlights: string;
  thoughts: string;
  notes: string;
  ratingWork: number;
  ratingFamily: number;
  ratingSelfCare: number;
  reflection: string;
}

const initialEntry: JournalEntry = {
  affirmation: "",
  priorityWork: "",
  priorityFamily: "",
  prioritySelfCare: "",
  gratitude: "",
  highlights: "",
  thoughts: "",
  notes: "",
  ratingWork: 0,
  ratingFamily: 0,
  ratingSelfCare: 0,
  reflection: "",
};

export function JournalForm() {
  const [entry, setEntry] = useState<JournalEntry>(initialEntry);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  const updateEntry = (field: keyof JournalEntry, value: string | number) => {
    setEntry(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // This will be connected to Supabase later
    toast({
      title: "Entry Saved",
      description: "Your journal entry has been saved successfully.",
    });
  };

  const handleClear = () => {
    setEntry(initialEntry);
    toast({
      title: "Entry Cleared",
      description: "All fields have been reset.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Daily Guided Journal
        </h1>
        <div className="flex items-center justify-center gap-4">
          <Calendar className="w-5 h-5 text-primary" />
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2"
          />
        </div>
        <p className="text-muted-foreground text-lg">{formatDate(currentDate)}</p>
      </div>

      {/* Daily Affirmation */}
      <JournalSection title="Daily Affirmation" background="warm">
        <Textarea
          placeholder="I am capable of achieving my goals today..."
          value={entry.affirmation}
          onChange={(e) => updateEntry('affirmation', e.target.value)}
          maxLength={200}
          className="min-h-[80px] resize-none border-none bg-transparent focus:ring-1 focus:ring-primary"
        />
        <div className="text-xs text-muted-foreground text-right mt-1">
          {entry.affirmation.length}/200
        </div>
      </JournalSection>

      {/* Top Priorities */}
      <JournalSection title="Top Priorities for the Day" background="focus">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Work</label>
            <Input
              placeholder="Focus on project presentation..."
              value={entry.priorityWork}
              onChange={(e) => updateEntry('priorityWork', e.target.value)}
              maxLength={100}
              className="border-none bg-white/50 focus:ring-1 focus:ring-primary"
            />
            <div className="text-xs text-muted-foreground text-right mt-1">
              {entry.priorityWork.length}/100
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Family</label>
            <Input
              placeholder="Quality time with loved ones..."
              value={entry.priorityFamily}
              onChange={(e) => updateEntry('priorityFamily', e.target.value)}
              maxLength={100}
              className="border-none bg-white/50 focus:ring-1 focus:ring-primary"
            />
            <div className="text-xs text-muted-foreground text-right mt-1">
              {entry.priorityFamily.length}/100
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Self-Care</label>
            <Input
              placeholder="Morning meditation and exercise..."
              value={entry.prioritySelfCare}
              onChange={(e) => updateEntry('prioritySelfCare', e.target.value)}
              maxLength={100}
              className="border-none bg-white/50 focus:ring-1 focus:ring-primary"
            />
            <div className="text-xs text-muted-foreground text-right mt-1">
              {entry.prioritySelfCare.length}/100
            </div>
          </div>
        </div>
      </JournalSection>

      {/* Gratitude */}
      <JournalSection title="I'm Grateful For" background="calm">
        <Textarea
          placeholder="Today I'm grateful for..."
          value={entry.gratitude}
          onChange={(e) => updateEntry('gratitude', e.target.value)}
          maxLength={300}
          className="min-h-[100px] resize-none border-none bg-transparent focus:ring-1 focus:ring-primary"
        />
        <div className="text-xs text-muted-foreground text-right mt-1">
          {entry.gratitude.length}/300
        </div>
      </JournalSection>

      {/* Highlights */}
      <JournalSection title="Highlights of the Day">
        <Textarea
          placeholder="The best parts of my day were..."
          value={entry.highlights}
          onChange={(e) => updateEntry('highlights', e.target.value)}
          maxLength={500}
          className="min-h-[120px] resize-none border-none bg-transparent focus:ring-1 focus:ring-primary"
        />
        <div className="text-xs text-muted-foreground text-right mt-1">
          {entry.highlights.length}/500
        </div>
      </JournalSection>

      {/* Thoughts & Feelings */}
      <JournalSection title="Thoughts, Feelings & Doodles" background="warm">
        <Textarea
          placeholder="Express your thoughts and feelings freely..."
          value={entry.thoughts}
          onChange={(e) => updateEntry('thoughts', e.target.value)}
          maxLength={1000}
          className="min-h-[150px] resize-none border-none bg-transparent focus:ring-1 focus:ring-primary"
        />
        <div className="text-xs text-muted-foreground text-right mt-1">
          {entry.thoughts.length}/1000
        </div>
      </JournalSection>

      {/* Notes */}
      <JournalSection title="Notes">
        <Textarea
          placeholder="Additional thoughts or reminders..."
          value={entry.notes}
          onChange={(e) => updateEntry('notes', e.target.value)}
          maxLength={300}
          className="min-h-[80px] resize-none border-none bg-transparent focus:ring-1 focus:ring-primary"
        />
        <div className="text-xs text-muted-foreground text-right mt-1">
          {entry.notes.length}/300
        </div>
      </JournalSection>

      {/* Rate Your Day */}
      <JournalSection title="Rate Your Day" background="focus">
        <div className="grid md:grid-cols-3 gap-6">
          <StarRating
            label="Work Productivity"
            rating={entry.ratingWork}
            onRatingChange={(rating) => updateEntry('ratingWork', rating)}
          />
          <StarRating
            label="Family Relationships"
            rating={entry.ratingFamily}
            onRatingChange={(rating) => updateEntry('ratingFamily', rating)}
          />
          <StarRating
            label="Self-Care Activities"
            rating={entry.ratingSelfCare}
            onRatingChange={(rating) => updateEntry('ratingSelfCare', rating)}
          />
        </div>
      </JournalSection>

      {/* Reflection */}
      <JournalSection title="Reflection" background="calm">
        <p className="text-sm text-muted-foreground mb-3">
          How could I have made today better?
        </p>
        <Textarea
          placeholder="Tomorrow I will focus on..."
          value={entry.reflection}
          onChange={(e) => updateEntry('reflection', e.target.value)}
          maxLength={400}
          className="min-h-[100px] resize-none border-none bg-transparent focus:ring-1 focus:ring-primary"
        />
        <div className="text-xs text-muted-foreground text-right mt-1">
          {entry.reflection.length}/400
        </div>
      </JournalSection>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
        >
          <Save className="w-5 h-5" />
          Save Entry
        </Button>
        <Button 
          onClick={handleClear}
          variant="outline"
          className="flex items-center gap-2 px-8 py-3 text-lg border-border hover:bg-accent"
        >
          <RotateCcw className="w-5 h-5" />
          Clear All
        </Button>
      </div>
    </div>
  );
}