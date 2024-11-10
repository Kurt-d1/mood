import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ExternalLink } from 'lucide-react';
import { getPlatformIcon } from '../utils/platformUtils';
import type { Post } from '../types/post';

interface PostEditFormProps {
  post: Post | null;
  onUpdate: (post: Post) => void;
  isInternalUser: boolean;
}

export function PostEditForm({ post, onUpdate, isInternalUser }: PostEditFormProps) {
  const [editedPost, setEditedPost] = useState<Post>(post!);
  const [newComment, setNewComment] = useState('');

  if (!post) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (name: string) => {
    setEditedPost({ ...editedPost, [name]: !editedPost[name] });
  };

  const handlePlatformChange = (platform: string) => {
    const updatedPlatforms = editedPost.platforms.includes(platform)
      ? editedPost.platforms.filter(p => p !== platform)
      : [...editedPost.platforms, platform];
    setEditedPost({ ...editedPost, platforms: updatedPlatforms });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const updatedPost = {
        ...editedPost,
        comments: [...editedPost.comments, { id: Date.now(), text: newComment }],
        needsAttention: true
      };
      setEditedPost(updatedPost);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto p-4">
      <div className="flex items-center space-x-4">
        <img
          src={editedPost.media}
          alt="Post media"
          className="w-20 h-20 object-cover rounded-lg shadow-sm"
        />
        <div>
          <h3 className="text-lg font-semibold">Edit Post</h3>
          <p className="text-sm text-gray-500">ID: {editedPost.id}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateToPost">Date to Post</Label>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <Input
            type="date"
            id="dateToPost"
            name="dateToPost"
            value={editedPost.dateToPost}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="driveLink">Drive Link</Label>
        <div className="flex items-center space-x-2">
          <ExternalLink className="h-4 w-4 text-gray-500" />
          <Input
            type="url"
            id="driveLink"
            name="driveLink"
            value={editedPost.driveLink}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Platforms</Label>
        <div className="flex space-x-6">
          {['Instagram', 'Facebook', 'Twitter'].map(platform => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox
                id={`platform-${platform}`}
                checked={editedPost.platforms.includes(platform)}
                onCheckedChange={() => handlePlatformChange(platform)}
              />
              <Label
                htmlFor={`platform-${platform}`}
                className="flex items-center space-x-2 cursor-pointer"
              >
                {getPlatformIcon(platform)}
                <span>{platform}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="caption">Caption</Label>
        <Textarea
          id="caption"
          name="caption"
          value={editedPost.caption}
          onChange={handleInputChange}
          className="h-24"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="designApproved"
            checked={editedPost.designApproved}
            onCheckedChange={() => handleCheckboxChange('designApproved')}
          />
          <Label htmlFor="designApproved">Design Approved</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="contentDone"
            checked={editedPost.contentDone}
            onCheckedChange={() => handleCheckboxChange('contentDone')}
          />
          <Label htmlFor="contentDone">Content Done</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={editedPost.status}
          onValueChange={(value) => setEditedPost({ ...editedPost, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved by client">Approved by client</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="posted"
          checked={editedPost.posted}
          onCheckedChange={() => handleCheckboxChange('posted')}
        />
        <Label htmlFor="posted">Posted</Label>
      </div>

      {isInternalUser && (
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={editedPost.company}
            onChange={handleInputChange}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Comments</Label>
        <div className="space-y-2 mb-4">
          {editedPost.comments.map(comment => (
            <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
              {comment.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <Input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <Button type="submit">Add</Button>
        </form>
      </div>

      <Button
        onClick={() => onUpdate(editedPost)}
        className="w-full"
      >
        Save Changes
      </Button>
    </div>
  );
}