import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ExternalLink, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getPlatformIcon } from '../utils/platformUtils';
import { PostEditForm } from './PostEditForm';
import type { Post } from '../types/post';

interface TableViewProps {
  filteredPosts: Post[];
  isInternalUser: boolean;
  setSelectedPost: (post: Post) => void;
  selectedPost: Post | null;
  handlePostUpdate: (post: Post) => void;
}

export function TableView({
  filteredPosts,
  isInternalUser,
  setSelectedPost,
  selectedPost,
  handlePostUpdate
}: TableViewProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date to Post</TableHead>
            <TableHead>Drive Link</TableHead>
            <TableHead>Platforms</TableHead>
            <TableHead>Media</TableHead>
            <TableHead>Caption</TableHead>
            <TableHead>Design Approved</TableHead>
            <TableHead>Content Done</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Posted</TableHead>
            {isInternalUser && <TableHead>Company</TableHead>}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map((post) => (
            <TableRow key={post.id} className={post.needsAttention ? 'bg-yellow-50' : ''}>
              <TableCell>{post.dateToPost}</TableCell>
              <TableCell>
                <a
                  href={post.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Link
                </a>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {post.platforms.map(platform => (
                    <span key={platform} title={platform} className="text-gray-600">
                      {getPlatformIcon(platform)}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <img src={post.media} alt="Post media" className="w-10 h-10 object-cover rounded-md" />
              </TableCell>
              <TableCell className="max-w-[200px] truncate">{post.caption}</TableCell>
              <TableCell>{post.designApproved ? <Check className="text-green-500" /> : <X className="text-red-500" />}</TableCell>
              <TableCell>{post.contentDone ? <Check className="text-green-500" /> : <X className="text-red-500" />}</TableCell>
              <TableCell>
                <Badge variant={post.status === 'Approved by client' ? 'success' : 'warning'}>
                  {post.status}
                </Badge>
              </TableCell>
              <TableCell>{post.posted ? <Check className="text-green-500" /> : <X className="text-red-500" />}</TableCell>
              {isInternalUser && <TableCell>{post.company}</TableCell>}
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPost(post)}
                      className="flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}