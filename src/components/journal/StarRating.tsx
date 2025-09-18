import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  label: string;
  className?: string;
}

export function StarRating({ rating, onRatingChange, label, className }: StarRatingProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-sm"
            aria-label={`Rate ${star} out of 5 stars`}
          >
            <Star
              size={24}
              className={cn(
                "transition-colors duration-200",
                star <= rating
                  ? "fill-journal-star text-journal-star"
                  : "text-journal-star-empty hover:text-journal-star/50"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}