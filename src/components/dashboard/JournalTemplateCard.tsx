import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface JournalTemplateCardProps {
  onStartJournal: () => void;
}

export function JournalTemplateCard({ onStartJournal }: JournalTemplateCardProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-border hover:border-primary/20" onClick={onStartJournal}>
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Daily Guided Journal Template</h3>
            <p className="text-muted-foreground">Click anywhere to start your journal entry</p>
          </div>

          {/* Template Layout - Based on your image */}
          <div className="grid grid-cols-12 gap-4 h-96">
            {/* Left Column */}
            <div className="col-span-3 space-y-4">
              {/* Notes Section */}
              <div className="h-24 bg-journal-calm rounded-lg border border-border p-3">
                <h4 className="text-sm font-medium text-foreground mb-2">Notes</h4>
                <div className="h-full bg-white/20 rounded border border-dashed border-border/50"></div>
              </div>

              {/* Mood Rating */}
              <div className="h-32 bg-journal-focus rounded-lg border border-border p-3">
                <h4 className="text-sm font-medium text-foreground mb-2">Rate your day</h4>
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Work: ☆☆☆☆☆</div>
                  <div className="text-xs text-muted-foreground">Family: ☆☆☆☆☆</div>
                  <div className="text-xs text-muted-foreground">Self-Care: ☆☆☆☆☆</div>
                </div>
              </div>
            </div>

            {/* Center Column */}
            <div className="col-span-6 space-y-4">
              {/* Personal Life Schedule */}
              <div className="h-20 bg-journal-warm rounded-lg border border-border p-3">
                <h4 className="text-sm font-medium text-foreground mb-1">Personal Life Schedule - Today</h4>
                <div className="h-full bg-white/20 rounded border border-dashed border-border/50"></div>
              </div>

              {/* Work and Self-Care Grid */}
              <div className="grid grid-cols-2 gap-4 h-32">
                <div className="bg-journal-calm rounded-lg border border-border p-3">
                  <h4 className="text-sm font-medium text-foreground mb-2">Work</h4>
                  <div className="h-full bg-white/20 rounded border border-dashed border-border/50"></div>
                </div>
                <div className="bg-journal-focus rounded-lg border border-border p-3">
                  <h4 className="text-sm font-medium text-foreground mb-2">Self-Care</h4>
                  <div className="h-full bg-white/20 rounded border border-dashed border-border/50"></div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-3 gap-4 h-32">
                <div className="bg-journal-warm rounded-lg border border-border p-3">
                  <h4 className="text-xs font-medium text-foreground mb-2">Thoughts - Feelings - Doodles</h4>
                  <div className="h-full bg-white/20 rounded border border-dashed border-border/50"></div>
                </div>
                <div className="bg-card rounded-lg border border-border p-3">
                  <h4 className="text-xs font-medium text-foreground mb-2">Highlights of the day</h4>
                  <div className="h-full bg-white/20 rounded border border-dashed border-border/50"></div>
                </div>
                <div className="bg-journal-calm rounded-lg border border-border p-3">
                  <h4 className="text-xs font-medium text-foreground mb-2">I'm grateful for</h4>
                  <div className="h-full bg-white/20 rounded border border-dashed border-border/50"></div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-3 space-y-4">
              {/* Date */}
              <div className="h-16 bg-journal-focus rounded-lg border border-border p-3 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm font-medium text-foreground">Date</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Daily Affirmation */}
              <div className="h-24 bg-journal-warm rounded-lg border border-border p-3">
                <h4 className="text-sm font-medium text-foreground mb-2">Daily Affirmation</h4>
                <div className="h-full bg-white/20 rounded border border-dashed border-border/50"></div>
              </div>

              {/* Family */}
              <div className="h-32 bg-card rounded-lg border border-border p-3">
                <h4 className="text-sm font-medium text-foreground mb-2">Family</h4>
                <div className="h-full bg-white/20 rounded border border-dashed border-border/50"></div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-4 border-t border-border">
            <Button size="lg" className="px-8">
              Start Writing Your Journal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}