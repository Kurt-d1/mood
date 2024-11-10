import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PostEditForm } from './PostEditForm';
import type { Post } from '../types/post';

interface CalendarViewProps {
  filteredPosts: Post[];
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  setSelectedPost: (post: Post) => void;
  selectedPost: Post | null;
  handlePostUpdate: (post: Post) => void;
  isInternalUser: boolean;
}

export function CalendarView({
  filteredPosts,
  currentMonth,
  setCurrentMonth,
  setSelectedPost,
  selectedPost,
  handlePostUpdate,
  isInternalUser
}: CalendarViewProps) {
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const postsInMonth = filteredPosts.filter(post => {
    const postDate = new Date(post.dateToPost);
    return postDate.getMonth() === currentMonth.getMonth() && postDate.getFullYear() === currentMonth.getFullYear();
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
        >
          Previous Month
        </Button>
        <h2 className="text-2xl font-bold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <Button
          variant="outline"
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
        >
          Next Month
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-600">{day}</div>
        ))}
        
        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={`empty-${index}`} className="h-32 bg-gray-50 rounded-lg"></div>
        ))}
        
        {days.map(day => {
          const postsOnDay = postsInMonth.filter(post => new Date(post.dateToPost).getDate() === day);
          const allPosted = postsOnDay.every(post => post.posted);
          const anyPending = postsOnDay.some(post => !post.posted);
          const needsAttention = postsOnDay.some(post => post.needsAttention);
          
          return (
            <Card
              key={day}
              className={`h-32 overflow-hidden transition-shadow hover:shadow-md
                ${needsAttention ? 'ring-2 ring-yellow-400' : ''}
              `}
            >
              {postsOnDay.length > 0 && (
                <div 
                  className={`h-1 w-full ${
                    allPosted ? 'bg-green-500' :
                    anyPending ? 'bg-red-500' : 'bg-gray-500'
                  }`}
                  title={
                    allPosted ? 'All posts published' :
                    anyPending ? 'Pending posts' : 'Mixed status'
                  }
                />
              )}
              <CardContent className="p-2">
                <div className="font-bold mb-1">{day}</div>
                {postsOnDay.length > 0 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto w-full"
                        onClick={() => setSelectedPost(postsOnDay[0])}
                      >
                        <div className="relative w-full h-20">
                          <img 
                            src={postsOnDay[0].media} 
                            alt={`Post for ${postsOnDay[0].dateToPost}`} 
                            className="w-full h-full object-cover rounded"
                          />
                          {postsOnDay.length > 1 && (
                            <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white px-1 rounded">
                              +{postsOnDay.length - 1}
                            </div>
                          )}
                          {postsOnDay[0].comments.length > 0 && (
                            <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                              {postsOnDay[0].comments.length}
                            </div>
                          )}
                        </div>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                      </DialogHeader>
                      <PostEditForm
                        post={selectedPost}
                        onUpdate={handlePostUpdate}
                        isInternalUser={isInternalUser}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}