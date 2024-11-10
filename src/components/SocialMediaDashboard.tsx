import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Calendar } from 'lucide-react';
import { FilterControls } from './FilterControls';
import { TableView } from './TableView';
import { CalendarView } from './CalendarView';
import { initialPosts } from '../data/mockData';
import type { Post } from '../types/post';

interface SocialMediaDashboardProps {
  isInternalUser?: boolean;
}

export default function SocialMediaDashboard({ isInternalUser = true }: SocialMediaDashboardProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const filteredPosts = posts
    .filter(post => isInternalUser || post.company === 'TechCorp')
    .filter(post => statusFilter === 'all' || post.status === statusFilter)
    .filter(post => platformFilter === 'all' || post.platforms.includes(platformFilter))
    .filter(post => companyFilter === 'all' || post.company === companyFilter);

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
    setSelectedPost(null);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Social Media Dashboard</h1>
      <FilterControls
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
        companyFilter={companyFilter}
        setCompanyFilter={setCompanyFilter}
        isInternalUser={isInternalUser}
      />
      <Tabs defaultValue="table" className="mb-4">
        <TabsList className="mb-6">
          <TabsTrigger value="table" className="flex items-center">
            <List className="h-4 w-4 mr-2" />Table View
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />Calendar View
          </TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          <TableView
            filteredPosts={filteredPosts}
            isInternalUser={isInternalUser}
            setSelectedPost={setSelectedPost}
            selectedPost={selectedPost}
            handlePostUpdate={handlePostUpdate}
          />
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarView
            filteredPosts={filteredPosts}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            setSelectedPost={setSelectedPost}
            selectedPost={selectedPost}
            handlePostUpdate={handlePostUpdate}
            isInternalUser={isInternalUser}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}